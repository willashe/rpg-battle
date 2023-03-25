import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Window from '../components/Window';
import Sprite from '../components/Sprite';

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;
const IconLink = styled.a`
  margin: 0 1rem 1rem;
  display: inline-block;
`;

const About = () => (
  <div>
    <h1>
      Phantasy Star 2<br />
      Battle Simulator
    </h1>

    <Content>
      <p>
        Homage to the fighting system from the 1989 RPG classic{' '}
        <i>Phantasy Star 2</i> for the Sega Genesis console.
      </p>

      <div style={{ display: 'flex', margin: '0 0 1em' }}>
        <Window style={{ width: '50%' }}>
          <h3>Will Ashe</h3>
          <IconLink href="https://willashe.com/">
            <Sprite
              src="./assets/website-icon.png"
              width={16}
              height={16}
              alt="website icon"
            />
          </IconLink>
          <IconLink href="https://github.com/willashe">
            <Sprite
              src="./assets/github-icon.png"
              width={16}
              height={16}
              alt="GitHub icon"
            />
          </IconLink>
          <IconLink href="https://www.linkedin.com/in/will-ashe/">
            <Sprite
              src="./assets/linkedin-icon.png"
              width={16}
              height={16}
              alt="LinkedIn icon"
            />
          </IconLink>
        </Window>
        <Window style={{ width: '50%' }}>
          <h3>Tomas Ortiz</h3>
          {/* <IconLink href="">
            <Sprite
              src="./assets/website-icon.png"
              width={16}
              height={16}
              alt="website icon"
            />
          </IconLink> */}
          <IconLink href="https://github.com/tomas395">
            <Sprite
              src="./assets/github-icon.png"
              width={16}
              height={16}
              alt="GitHub icon"
            />
          </IconLink>
          <IconLink href="https://www.linkedin.com/in/tomas-ortiz-15b7a5199/">
            <Sprite
              src="./assets/linkedin-icon.png"
              width={16}
              height={16}
              alt="LinkedIn icon"
            />
          </IconLink>
        </Window>
      </div>
      <Link to="/">Home</Link>
    </Content>
  </div>
);

export default About;
