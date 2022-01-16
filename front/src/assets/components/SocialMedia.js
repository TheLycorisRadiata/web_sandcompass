import Logo_Patreon from '../images/logos/patreon.png';
import Logo_YouTube from '../images/logos/youtube.png';
import Logo_GitHub from '../images/logos/github.png';
import Logo_Reddit from '../images/logos/reddit.png';

const SocialMedia = () => 
{
    return (
        <section id="social_media">
            <h2 className="sub_title">Social Media</h2>
            <ul>
                <li className="logo">
                    <a href="https://www.patreon.com/lycorisradiata" rel="noreferrer" target="_blank">
                        <img src={Logo_Patreon} alt="Logo Patreon" title="My Patreon page" /></a>
                </li>
                <li className="logo">
                    <a href="https://www.youtube.com/channel/UCowO_RtloSQ3qnKmvymsBRA" rel="noreferrer" target="_blank">
                        <img src={Logo_YouTube} alt="Logo YouTube" title="My YouTube channel" /></a>
                </li>
                <li className="logo">
                    <a href="https://github.com/lycorisradiata" rel="noreferrer" target="_blank">
                        <img src={Logo_GitHub} alt="Logo Github" title="My GitHub account" /></a>
                </li>
                <li className="logo">
                    <a href="https://www.reddit.com/user/lycorisradiata" rel="noreferrer" target="_blank">
                        <img src={Logo_Reddit} alt="Logo Reddit" title="My Reddit account" /></a>
                </li>
            </ul>
        </section>
    );
};

export default SocialMedia;

