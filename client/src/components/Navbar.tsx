
import { Button } from './ui/button'
import { LiaBrainSolid } from "react-icons/lia";

const Navbar = ({ handleAddButton }: { handleAddButton: () => void }) => {
  return (
    <div className='h-24 w-full flex border-2 border-black justify-between'>
        <div className='flex items-center justify-center m-2'>
            <div className='ml-4'>
             <LiaBrainSolid fontSize={50}/>  
             <span>Brainly</span>
            </div>
        </div>


        <div className='right flex gap-2 items-center justify-center m-2'>
            <Button variant={'secondary'} className='border-2 border-black'>share</Button>
            <Button onClick={handleAddButton}>Add</Button>

        </div>
    </div>
  )
}

export default Navbar