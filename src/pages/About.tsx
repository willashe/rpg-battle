import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Window from '../components/Window';
import Sprite from '../components/Sprite';

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Content = styled.div`
  margin: 0 auto;
  width: 100%;
`;
const ContactInfo = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0 0 1em;
`;
const IconLink = styled.a`
  margin: 0 1rem 1rem;
  display: inline-block;
  cursor: pointer;
`;

const About = () => (
  <Container>
    <h1 style={{ marginBottom: 0 }}>Phantasy Star 2</h1>
    <h2>- Battle Simulator -</h2>

    <Content>
      <p style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
        Homage to the fighting system from the 1989 RPG classic{' '}
        <i>Phantasy Star 2</i> for the Sega Genesis console.
      </p>

      <ContactInfo>
        <Window style={{ width: '30%' }}>
          <h3>Will Ashe</h3>
          <IconLink
            href="https://willashe.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Sprite
              src="./assets/website-icon.png"
              width={16}
              height={16}
              alt="website icon"
            />
          </IconLink>
          <IconLink
            href="https://github.com/willashe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Sprite
              src="./assets/github-icon.png"
              width={16}
              height={16}
              alt="GitHub icon"
            />
          </IconLink>
          <IconLink
            href="https://www.linkedin.com/in/will-ashe/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Sprite
              src="./assets/linkedin-icon.png"
              width={16}
              height={16}
              alt="LinkedIn icon"
            />
          </IconLink>
        </Window>
        <Window style={{ width: '30%' }}>
          <h3>Tomas Ortiz</h3>
          <IconLink
            href="https://github.com/tomas395"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Sprite
              src="./assets/github-icon.png"
              width={16}
              height={16}
              alt="GitHub icon"
            />
          </IconLink>
          <IconLink
            href="https://www.linkedin.com/in/tomas-ortiz-15b7a5199/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Sprite
              src="./assets/linkedin-icon.png"
              width={16}
              height={16}
              alt="LinkedIn icon"
            />
          </IconLink>
        </Window>
      </ContactInfo>
      <Link to="/">Home</Link>
    </Content>
  </Container>
);

export default About;
