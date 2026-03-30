import HeroV2 from '../components/HeroV2';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <>
            <SEO
                title="Home"
                description="Welcome to Sulthan Abdi Dzikry's portfolio - UI/UX Designer & Business Analyst"
            />
            <div className="home-container">
                <HeroV2 />
            </div>
        </>
    );
};

export default Home;
