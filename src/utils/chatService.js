import { projectsData } from '../data/projects';
import { translations } from '../utils/translations'; // Import real data

// This system prompt sets the persona for the AI
const SYSTEM_PROMPT = `
You are "Ningsih", the "Digital Partner" of Sulthan Abdi Dzikry.
Your goal is to represent his professional portfolio and discuss his background, skills, and projects as a knowledgeable partner.
Use the provided Context Data to answer. If the answer is not in the context, suggest contacting him directly via email or LinkedIn.

Tone: Professional, collaborative, confident, yet humble and helpful. 
Format: Use Markdown for lists or bold text.
Constraint: Do NOT introduce yourself in every response. Only introduce yourself if the user explicitly asks "Who are you?". Otherwise, answer the question directly.
`;

/**
 * Aggregates all portfolio data into a single context string.
 * This "feeds" the AI with the necessary knowledge.
 */
const buildPortfolioContext = () => {
    // 1. PROJECTS CONTEXT
    const projectsSummary = projectsData.map(p =>
        `- Project: ${p.title} (${p.category})
         Problem: ${p.problem}
         Solution: ${p.solution}
         Top Impact: ${p.impact}
         Stack: ${p.tags.join(', ')}`
    ).join('\n\n');

    // 2. PROFILE CONTEXT (From translations.js to match Website)
    const t = translations.en.profile;

    const jobsSummary = t.jobs.map(j =>
        `- ${j.role} at ${j.company} (${j.period}): ${j.desc}`
    ).join('\n');

    const orgsSummary = t.orgs.map(o =>
        `- ${o.role} at ${o.org} (${o.period}): ${o.desc}`
    ).join('\n');

    const certsSummary = t.certs.map(c =>
        `- ${c.name} (Issued by ${c.issuer}, ${c.date})`
    ).join('\n');

    const profileSummary = `
    Name: Sulthan Abdi Dzikry
    Current Role: ${t.role}
    Bio: ${t.bio} ${t.bioSub}
    
    Education: Bachelor of Informatics Engineering at Telkom University (GPA: 3.52 / 4.00)
    
    Experience:
    ${jobsSummary}

    Organizational Experience:
    ${orgsSummary}

    Certifications:
    ${certsSummary}
    `;

    return `
    ${SYSTEM_PROMPT}

    === PROFILE CONTEXT ===
    ${profileSummary}

    === SKILLS & EXPERTISE ===
    - Tech Arsenal: PHP, JavaScript/TypeScript, Laravel, Next.js, Node.js, React, Tailwind CSS, MongoDB, SQL, Cloud & DevOps
    - Product Frameworks: Agile, Scrum, Design Thinking, PRD, Jira
    - Industry Focus: Manufacturing, SaaS / B2B, EdTech, Telco

    === PROJECTS CONTEXT ===
    ${projectsSummary}
    `;
};

/**
 * Sends the user message + context to the AI API (Gemini).
 */
export const sendMessageToAI = async (userMessage) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const context = buildPortfolioContext();

    // 1. SIMULATED MODE (If no API Key)
    if (!apiKey) {
        return simulateAIResponse(userMessage);
    }

    // 2. REAL AI MODE (Gemini API)
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: context }, // Feed the context first
                            { text: `User Question: ${userMessage}` }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Gemini API Error:", data.error);
            throw new Error(data.error.message);
        }

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error("Unexpected response format from AI.");
        }

        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error("AI Request Failed:", error);

        // Fallback to Simulated Mode if Quota is Exceeded
        if (error.message.includes('Quota') || error.message.includes('429')) {
            console.warn("Quota exceeded. Switching to Offline Mode.");
            const simResponse = await simulateAIResponse(userMessage);
            return `${simResponse}\n\n*(Note: Reached daily API limit, using Offline Mode)*`;
        }

        throw new Error(error.message || "Connection failed");
    }
};

/**
 * A simple keyword matcher to simulate AI when no API key is present.
 */
const simulateAIResponse = (msg) => {
    const lowerMsg = msg.toLowerCase();
    const t = translations.en.profile;

    return new Promise((resolve) => {
        setTimeout(() => {
            // 1. Check for specific Projects
            const matchedProject = projectsData.find(p =>
                lowerMsg.includes(p.title.toLowerCase()) ||
                lowerMsg.includes(p.id.replace('-', ' '))
            );

            if (matchedProject) {
                resolve(`**${matchedProject.title}** is a ${matchedProject.category}.\n\nIt solves: "${matchedProject.problem}"\n\nSolution: ${matchedProject.solution}\n\nKey Impact: ${matchedProject.impact}`);
                return;
            }

            // 2. Questions about "Projects" in general
            if (lowerMsg.includes('project') || lowerMsg.includes('work') || lowerMsg.includes('portfolio')) {
                const projectList = projectsData.map(p => `- **${p.title}** (${p.category})`).join('\n');
                resolve(`I have worked on several exciting projects:\n\n${projectList}\n\nYou can ask me about any of them specifically!`);
                return;
            }

            // 3. Questions about Skills / Stack
            if (lowerMsg.includes('skill') || lowerMsg.includes('stack') || lowerMsg.includes('tech')) {
                const uniqueTags = [...new Set(projectsData.flatMap(p => p.tags))].join(', ');
                resolve(`My technical arsenal includes: **${uniqueTags}**.\n\nI specialize in Product Design and Development.`);
                return;
            }

            // 4. Questions about Experience / Background
            if (lowerMsg.includes('experience') || lowerMsg.includes('background') || lowerMsg.includes('job')) {
                const recentJob = t.jobs[0];
                resolve(`I am currently a **${recentJob.role}** at **${recentJob.company}** (${recentJob.period}).\n\n${t.bio}`);
                return;
            }

            // 5. Contact / Email
            if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach')) {
                resolve(`You can reach me directly via email at sulthanabdi1@gmail.com or connect on LinkedIn!`);
                return;
            }

            // 6. Identity
            if (lowerMsg.includes('who are you')) {
                resolve(`I am the AI assistant for **Sulthan Abdi Dzikry**, a ${t.role} and Developer. I'm here to help you navigate his portfolio.`);
                return;
            }

            // Default Fallback
            resolve("That's an interesting question! I focus on Sulthan's professional work. Try asking about his **projects**, **skills**, or **experience**.");
        }, 800);
    });
};
