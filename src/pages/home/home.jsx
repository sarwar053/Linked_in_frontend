import Header from "../../header/header"
import SectionEight from "./component/sectionEight"
import SectionEleven from "./component/sectionEleven"
import SectionFive from "./component/sectionFive"
import SectionFour from "./component/sectionFour"
import SectionNine from "./component/sectionNine"
import SectionOne from "./component/sectionOne"
import SectionSeven from "./component/sectionSeven"
import SectionSix from "./component/sectionSix"
import SectionTen from "./component/sectionTen"
import SectionThree from "./component/sectionThree"
import SectionTwelve from "./component/sectionTwelve"
import SectionTwo from "./component/sectionTwo"
import Footer from "../../footer/footer"
import Chat from "../../chat/chat"


function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour/>
      <SectionFive/>
      <SectionSix/>
      <SectionSeven/>
      <SectionEight/>
      <SectionNine/>
      <SectionTen/>
      <SectionEleven/>
      <SectionTwelve/>
 
      <Footer />
      <Chat />
      
    </div>
  )
}

export default Home
