import Image from "next/image"
import bgImg from '../../../public/bgImg.png'
import RescueImg from '../../../public/RescueTapImg.png'
import Form from 'next/form'

export default function forgetpassword(){
    return (
        <>
            <main>
                <div className="w-screen h-screen flex justify-center items-center">
                    <div className="grid grid-cols-2 h-full">
                        <div>
                        <Image src={bgImg} className="w-full h-full" />
                        </div>
                        <div className="h-full w-full bg-white text-black px-5 flex justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="mb-10">
                                <div className="flex justify-center">
                                    <Image src={RescueImg} alt="RescueTap Logo" width={75} height={75}/>
                                </div>
                            
                            <p className="text-xs text-center">Rescue Within Reach</p>
                            </div>
                            <h1 className="font-black ">Forgot Password</h1>
                            <p className="font-light text-slate-600">Please enter your email to reset your password</p>
                            <div className="text-black mt-10"> 
                                <Form action="/auth">
                                <label className="">Email</label>
                                    <br />
                                    <input type="email" placeholder="Enter Company Email" className="border border-slate-800 rounded px-3 py-1 w-full"/>                               
                                    <br />
                                    <br />
                                    <button className="bg-gray-200 w-full py-1">Log in</button>
                                </Form>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}