import checkContrast from './contrastChecker';
import checkLetter from './letterChecker';
import checkAnimation from './animationChecker';
import checkLang from './langChecker';
import checkTitle from './titleChecker';
import checkNav from './navChecker';
import checkFooter from './footerChecker';
import checkSection from './sectionChecker';
import checkTable from './tableChecker';
import checkFigure from './figureChecker';
import checkIcon from './iconChecker';
import checkMain from './mainChecker';
import checkImages from './imageChecker';
import checkSVG from './SVGChecker';
import checkIframe from './iframeChecker';
import checkHeaders from './headerChecker';
import checkLinksAndButtons from './linksAndButtonsChecker'
import checkInputs from './inputChecker';
import checkPopup from './popupChecker';
import checkVideoAndAudio from './videoChecker';

const checkers: any = {
  checkContrast,
  checkLetter,
  checkAnimation,
  checkLang,
  checkTitle,
  checkNav,
  checkFooter,
  checkSection,
  checkTable,
  checkFigure,
  checkIcon,
  checkMain,
  checkImages,
  checkSVG,
  checkIframe,
  checkHeaders,
  checkLinksAndButtons,
  checkInputs,
  checkPopup,
  checkVideoAndAudio,
}

export default checkers
