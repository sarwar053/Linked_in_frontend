import Chat from "../../chat/chat"
import Footer from "../../footer/footer"
import Header from "../../header/header"
import Hiw_sectionFive from "./component/Hiw_sectionFive"
import Hiw_sectionFour from "./component/Hiw_sectionFour"
import Hiw_sectionOne from "./component/Hiw_sectionOne"
import Hiw_sectionThree from "./component/Hiw_sectionThree"
import Hiw_sectionTWO from "./component/Hiw_sectionTWO"


function How_it_works() {
  return (
   <>
  
        <Header />
      <Hiw_sectionOne />
      <Hiw_sectionTWO />
      <Hiw_sectionThree />
      <Hiw_sectionFour />
      <Hiw_sectionFive />
      <Footer />
      <Chat />
 </>
  )
}

export default How_it_works
