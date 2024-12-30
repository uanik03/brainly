import AddContentModal from "@/components/AddContentModal";
import ContentCard from "@/components/ContentCard";
import MainComponent from "@/components/MainComponent";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { authTokenState } from "@/recoil/authAtoms";
import { contentListState } from "@/recoil/contentAtoms";
import { getAllContent } from "@/services/contentService";
import { useEffect, useState } from "react";
import {  useRecoilValue, useSetRecoilState } from "recoil";

const Home = () => {
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  

  const handleAddButton = ()=>{
    setIsAddContentOpen(!isAddContentOpen)
  }

 

  return (
    <div className="h-screen w-full flex flex-col">
      <Navbar handleAddButton={handleAddButton}/>
      <div className="flex-1 flex">
        <Sidebar />
        <MainComponent />
      </div>

      <AddContentModal
        setIsAddContentOpen={setIsAddContentOpen}
        isAddContentOpen={isAddContentOpen}
      />
    </div>
  );
};

export default Home;
