import  { useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import {  useRecoilValue } from "recoil";
import { userInfoState } from "@/recoil/authAtoms";
import { FaLink, FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";


const Sidebar = () => {
  const user = useRecoilValue(userInfoState);

  console.log(user)
  useEffect(() => {
    console.log(user)
  
   
  }, [user])
  
  return (
    <div className="h-full w-64 flex flex-col items-center  border-r-2 border-black">
      <ToggleGroup type="multiple"  className="flex flex-col items-start justify-center pt-6" >
        <ToggleGroupItem value="youtube" className="p-0"><span> <FaYoutube fontSize={22}/></span><span>youtube</span></ToggleGroupItem>

        <ToggleGroupItem value="twitter" className="p-0"><span><FaTwitter/></span><span>twitter</span></ToggleGroupItem>
        <ToggleGroupItem value="link" className="p-0"><span><FaLink /></span><span>link</span></ToggleGroupItem>
        <ToggleGroupItem value="document" className="p-0"><span><IoMdDocument /></span><span>document</span></ToggleGroupItem>

      </ToggleGroup>
      
    </div>
  );
};

export default Sidebar;
