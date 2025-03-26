import path from "../../../../public/images/Vector 1.png";
import car from "../../../../public/images/car 1.png";
import map from "../../../../public/images/map.png";

export default function MainContent({ data }) {
    return (
        <div className="flex">
            <div
                className={`z-20 ml-16 grid justify-start items-center w-full h-[90vh] font-bebas ${data}`}
            >
                <div className="flex flex-col text-center w-[60%]">
                    <div className="text-[60px]">
                        <h2 className="text-[#D8C292] drop-shadow-xl">
                            WELCOME TO{" "}
                            <span className="text-[#FF6F20]">
                                URBAN ODYSSEY
                            </span>
                        </h2>
                    </div>
                    <div>
                        <p className="text-[#FDEDCA] text-[35px] mt-[-25px]">
                            THE ONE AND THE MOST THING YOU NEED WHEN
                            <br />
                            <span className="block mt-[-15px]">
                                YOU'RE FEELING BORED
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex -mt-[40px]">
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex justify-center items-center w-[963px] h-[528px]">
                            <img
                                src={map}
                                alt=""
                                className="border-rounded rounded-[9px]"
                            />
                        </div>
                        <div>
                            <p className="font-bebas text-[40px] text-white">
                                Our maps come from the best tools
                            </p>
                        </div>
                    </div>
                    <div className="ml-4">
                        <div className="flex flex-col">
                            <div className="font-bebas text-[40px] text-[#FFFFAB] drop-shadow-2xl my-4">
                                <p>What we provides ?</p>
                            </div>
                            <div className="text-white text-[30px] font-montserrat space-y-2">
                                <p>• Possibility to re-explore your city</p>
                                <p>• New way of exploration and discovering</p>
                                <p>• No corner can hide from us</p>
                                <p>• Great community</p>
                                <p>• Suggestions for places you may never visit</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <button className="bg-[#A45A3D] text-white font-bebas text-[30px] rounded-[10px] w-[265px] h-[45px] ml-12">
                                <a href="/register">Sign Up</a>
                            </button>
                            <button className="bg-[#CF8562] text-white font-bebas text-[30px] rounded-[10px] w-[265px] h-[45px]">
                            <a href="/login">Log in</a>
                            </button>
                            <button className="bg-[#A45A3D] text-white font-bebas text-[30px] rounded-[10px] w-[550px] h-[59.26px] ml-12 col-span-2">
                            <a href="/UrbanOdyssey">Or visit us before having an account</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <img
                    src={path}
                    alt="Vector 1"
                    className="absolute right-0"
                    width="500"
                />
                <img
                    src={car}
                    alt="Car 1"
                    className="relative right-8 top-20 rotate-[10deg]"
                />
            </div>
        </div>
    );
}
