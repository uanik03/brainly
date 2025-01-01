import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { MdEdit, MdDelete } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import "./contantCardStyle.css"
import { FaSquareXTwitter } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@/recoil/authAtoms';



interface CardType {
  title: string;
  link?: string;
  type: string;
  content?: string;
  contentId:string;
  userId:string
  handleCardDelete: (carId:string)=>Promise<void>

}

// interface PropsType {
//   card:CardType;
//   handleCardDelete: ()=>void

// }

const ContentCard = (props: CardType) => {

  const user = useRecoilValue(userInfoState)

  function convertToEmbedUrl(youtubeUrl:string) {
    const url = new URL(youtubeUrl);
    const videoId = url.searchParams.get('v'); // Extract the video ID from the "v" parameter
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return 'Invalid YouTube URL';
  }

  const embedLink = convertToEmbedUrl(props.link as string)

  return (
    <Card className="w-96 mx-5 mt-5 rounded-md flex flex-col justify-between" style={{ minHeight: "300px", maxHeight: "500px" }}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto custom-scrollbar">
        {props.type === "youtube" && (
          <iframe
            width="100%"
            height="100%"
            style={{ borderRadius: "5px" }}
            src={embedLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          // <iframe width="1131" height="636" src="https://www.youtube.com/embed/f19bfHpCths" title="What Do Hedge Funds Think of Technical Analysis?" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

          
         

        )}

        {props.type === "twitter" && (
          <blockquote className="twitter-tweet max-h-full" style={{"height":"90%", "width":"90%"}}>
            <a href={props.link?.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pb-1  m-2">
        <div>
          {props.type=="youtube"&&<FaYoutube fontSize={22} />}
          {props.type=="twitter"&&<FaSquareXTwitter fontSize={22}/>}
        </div>
        <div className="flex gap-2">
     {   
     (user?.userId === props.userId  ) &&
      <AlertDialog>
      <AlertDialogTrigger> <MdDelete fontSize={22} className='cursor-pointer' /></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your content
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>props.handleCardDelete(props.contentId)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>}
    
      
         
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
