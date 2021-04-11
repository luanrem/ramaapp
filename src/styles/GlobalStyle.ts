import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  :root {
  --white:#FFF;
  --background: #F7F9F7;
  --blue: #1B1B39;
  --blue-dark: #031226;
  --green: #2DEB0E;
  --text: #666666;
  --gray-line: #DCDDE0;
  --blue-twitter: #2AA9E0;

  --text-highlight: #B3B9FF;
  --title: #2E384D;
  --red: #E83F5B;

  @font-face {
    font-family: 'GoodTimes';
    src: url("/fonts/good_times_rg.ttf");
    font-style: "medium";
    font-weight: "400"
  }
  }

  body {
    background: var(--background);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`
