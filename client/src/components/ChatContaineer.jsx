import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { fomatMessageTime } from '../library/utils';

const ChatContaineer = ({selectedUser,setSelectedUser}) => {

    const scrollEnd = useRef();

    useEffect(()=>{
        if(scrollEnd.current){
            scrollEnd.current.scrollIntoView({behavior:"smooth"})
        }
    },[])
  return selectedUser? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
        {/* chat containeer header section  */}
        <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
            <div className='relative flex'>
                <img src={assets.profile_martin} alt="" className='w-8 rounded-full'/>
                <div className='w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border border-[2px]'></div>
            </div>
            <p className='text-white font-bold'>Martin Johnson</p>
            <img onClick={()=>setSelectedUser(null)} src={assets.arrow_icon} alt="arrow icon" className='md:hidden max-w-7'/>
            <img src={assets.help_icon} alt="help icon" className='max-w-5 max-md:hidden'/>
        </div>

        {/* chat area  */}

        <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
            {messagesDummyData.map((messages,index)=>(
                <div key={index} className={`flex item-end gap-2 justify-end ${messages.senderId !== "680f5116f10f3cd28382ed02" ? "flex-row-reverse" : ""}`}>
                    {messages.image ? (<img src={messages.image} alt='image' className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'/>):
                    (<p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${messages.senderId ==="680f5116f10f3cd28382ed02"?"rounded-br-none":"rounded-bl-none"}`}>{messages.text}</p>)}

                    <div className='text-center text-xs'>
                        <img src={messages.senderId === "680f5116f10f3cd28382ed02" ?assets.avatar_icon:assets.profile_martin} className='w-7 rounded-full' alt="profile icon" />
                        <p className='text-gray-500'>{fomatMessageTime(messages.createdAt)}</p>
                    </div>
                </div>
            ))}

            <div ref={scrollEnd}></div>
        </div>


        {/* -------- Chat input feild bottom area --------- */}

        <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
            <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
                <input type="text" placeholder='send a message' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder:-gray-400'/>
                <input type="file" id='image' accept='image/png, image/jpeg' hidden/>
                <label htmlFor="image">
                    <img src={assets.gallery_icon} alt="gallery icon" className='w-5 mr-2 cursor-pointer'/>
                </label>
            </div>
            <img src={assets.send_button} alt="send button" className='w-7 cursor-pointer' />
        </div>
    </div>
  ):(
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
        <img src={assets.logo_icon} alt="logo icon" className='max-w-16' />
        <p className='text-lg font-medium text-white'>Chat anytime, Any where</p>
    </div>
  )
}

export default ChatContaineer