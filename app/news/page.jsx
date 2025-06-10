import HomepageNav from "@/components/HomepageNav";
import News from "@/components/News"

export const metadata = {
  title: "News | Memorial Grammar School",
  description: "Memorial Grammar School Portal",
};
const page = () => {
  return (
    <div>
        <HomepageNav/>
        <News/>
    </div>
  )
}

export default page