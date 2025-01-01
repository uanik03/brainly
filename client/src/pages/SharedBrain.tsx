import AddContentModal from "@/components/AddContentModal";
import ContentCard from "@/components/ContentCard";
import MainComponent from "@/components/MainComponent";
import Navbar from "@/components/Navbar";
import OtherBrainComponent from "@/components/OtherBrainComponent";
import Sidebar from "@/components/Sidebar";

const SharedBrain = () => {
  

  

  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar isUser={false} />
      <div className="flex-1 flex">
        <Sidebar />
        <OtherBrainComponent/>
      </div>

     
    </div>
  );
};

export default SharedBrain;
