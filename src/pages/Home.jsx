import HeroShooter from '../components/HeroShooter';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <>
            <SEO
                title="Home"
                description="Welcome to Sulthan Abdi Dzikry's portfolio - UI/UX Designer & Business Analyst"
            />
            <div className="home-container">
                <HeroShooter />
            </div>
        </>
    );
};

export default Home;
