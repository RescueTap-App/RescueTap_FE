import Image from "next/image";
import bgImg from '../../../public/bgImg.png'
import RescueImg from '../../../public/RescueTapImg.png'
import Form from 'next/form'


export default function Signup(){
    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center">
      <div className="grid grid-cols-2 h-full">
        <div>
          <Image src={bgImg} className="w-full h-full" />
        </div>
        <div className="h-full w-full bg-white text-black px-5 flex justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-10">
              <Image src={RescueImg} alt="RescueTap Logo" width={75} height={75}/>
              <p className="text-xs">Rescue Within Reach</p>
            </div>
            <h1 className="font-black ">Admin Log In</h1>
            <p className="font-light text-slate-600">Input your login details below.</p>
            <div className="text-black"> 
              <Form action="/auth">
              <label>First Name</label><br />
              <input type="text" placeholder="Enter Text" className="border border-slate-800 rounded px-3 py-2"/>  
              < br />
              <br />
              <label className="">Email</label>
                <br />
                <input type="email" placeholder="Enter Text" className="border border-slate-800 rounded px-3 py-2"/>  
                <br />
                <br />
                <label className="block">Password</label>
                <input type="password"placeholder="Enter Text" className="border border-slate-800 rounded px-3 py-2"/>
                <div className="flex justify-between">
                  <div><input type="checkbox" className="pe-2"/> Remember me</div>
                  
                  <a href="/forgetpassword">Forget Password?</a>
                </div>
                <br />
                <br />
                <button className="bg-gray-200 w-full py-1">Sign in</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}