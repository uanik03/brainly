import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Button } from './ui/button';
import { LiaBrainSolid } from "react-icons/lia";
import { authTokenState, userInfoState } from '@/recoil/authAtoms';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'; // Assuming you're using shadcn dialog
import { deleteShareableLink, shareBrain } from '@/services/contentService';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

const Navbar = ({ handleAddButton, isUser }: { handleAddButton?: () => void , isUser:boolean}) => {
  const setUser = useSetRecoilState(userInfoState);
  const [token,setToken] = useRecoilState(authTokenState);
  const navigate = useNavigate();
  const [isShare, setIsShare] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteButton = async () => {
    const res = await deleteShareableLink(token as string)
    console.log(res)
    alert(res.msg)

  }

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  const handleShare = async () => {
    setLoading(true);
    if (!token) {
      console.error("No token found");
      setLoading(false);
      return;
    }
    const link = await shareBrain(token);
    setShareLink(link || "Failed to generate link");
    setIsShare(true);
    setLoading(false);
  };
  // const FirstLetterOfUser = user?.name?.split("")[0];
  return (
    <div className="h-24 w-full flex border-2 border-black justify-between">
      <div className="flex items-center justify-center m-2">
        <div className="ml-4">
          <LiaBrainSolid fontSize={50} />
          <span>Brainly</span>
        </div>
      </div>

      <div className="right flex gap-2 items-center justify-center m-2">
       {isUser && <Button
          variant="secondary"
          className="border-2 border-black"
          onClick={handleShare}
          disabled={loading}
        >
          {loading ? "Sharing..." : "Share"}
        </Button>}
        {isUser && 
        
        
        <AlertDialog>
        <AlertDialogTrigger><Button variant="secondary" className='border-2 border-black' >delete link</Button></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the shareable link
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteButton}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>}

        {isUser && <Button onClick={handleAddButton}>Add</Button>}
       {isUser && <Button onClick={logout}>Logout</Button>}
       {/* {!isUser && <Avatar>
  <AvatarImage src="" />
  <AvatarFallback>{FirstLetterOfUser}</AvatarFallback>
</Avatar>
} */}
      </div>

      {/* Share Link Modal */}
      {isUser && isShare && (
        <Dialog open={isShare} onOpenChange={setIsShare}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Your Brain</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {shareLink ? (
                <div>
                  <p>Copy the link below:</p>
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="w-full p-2 mt-2 border rounded"
                  />
                  <Button
                    variant="default"
                    className="mt-2"
                    onClick={() => {
                      navigator.clipboard.writeText(shareLink);
                    }}
                  >
                    Copy to Clipboard
                  </Button>
                </div>
              ) : (
                <p>Failed to generate share link. Please try again.</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Navbar;
