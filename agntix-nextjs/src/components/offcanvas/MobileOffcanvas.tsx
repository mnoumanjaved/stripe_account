import { CrossIcon, CrossIconTwo, DribbleTwo, InstagramSvg, TwitterTwo } from "@/svg";
import logoWhite from "../../../public/assets/img/logo/logo-white.png";
import logoBlack from "../../../public/assets/img/logo/logo-black.png";
import MobileMenus from "../../layouts/subComponents/MobileMenus";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import React from 'react';

// prop type
type IProps = {
    openOffcanvas: boolean;
    setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileOffcanvas: React.FC<IProps> = (
    {
        openOffcanvas,
        setOpenOffcanvas
    }) => {

    const pathName = usePathname();

    const darkPaths = [
        "/portfolio-wrapper-slider",
        "/portfolio-webgl-showcase",
        "/portfolio-creative-thumb-slider",
        "/portfolio-creative-skew-slider",
        "/portfolio-creative-text-slider",
        "/portfolio-parallax-slider",
        "/portfolio-showcase-light",
        "/portfolio-interactive-with-hover",
        "/portfolio-interactive-with-scroll",
    ];

    const isDarkPath = pathName && darkPaths.includes(pathName);

    return (
        <div className={`tp-offcanvas-2-area p-relative 
               ${isDarkPath ? "offcanvas-2-black-bg" : "offcanvas-2-white-bg"}
                ${openOffcanvas ? "opened" : ""}`}>
            <div className="tp-offcanvas-2-bg is-left left-box"></div>
            <div className="tp-offcanvas-2-bg is-right right-box d-none d-md-block"></div>
            <div className="tp-offcanvas-2-wrapper">
                <div className="tp-offcanvas-2-left left-box">
                    <div className="tp-offcanvas-2-left-wrap d-flex justify-content-between align-items-center">
                        <div className="tp-offcanvas-2-logo">
                            <Link href="/">
                                <Image className="logo-1" width={140} src={logoWhite} alt="logo-white" />
                                <Image className="logo-2" width={140} src={logoBlack} alt="logo-black" />
                            </Link>
                        </div>
                        <div className="tp-offcanvas-2-close d-md-none text-end">
                            <button onClick={() => setOpenOffcanvas(false)} className="tp-offcanvas-2-close-btn">
                                <span className="text">
                                    <span>close</span>
                                </span>
                                <span className="d-inline-block">
                                    <span><CrossIcon /></span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="tp-offcanvas-menu counter-row">
                        <nav><MobileMenus /></nav>
                    </div>
                </div>
                <div className="tp-offcanvas-2-right right-box d-none d-md-block p-relative">
                    <div className="tp-offcanvas-2-close text-end">
                        <button onClick={() => setOpenOffcanvas(false)} className="tp-offcanvas-2-close-btn">
                            <span className="text"><span>close</span></span>
                            <span className="d-inline-block">
                                <span><CrossIconTwo /></span>
                            </span>
                        </button>
                    </div>
                    <div className="tp-offcanvas-2-right-info-box mt-160">
                        <h4 className="tp-offcanvas-2-right-info-title">Get In Touch</h4>
                        <div className="tp-offcanvas-2-right-info-item">
                            <label className="mb-10">Phone</label>
                            <Link className="tp-line-white" href="tel:42345678910">+4 (234) 567 8910</Link>
                        </div>
                        <div className="tp-offcanvas-2-right-info-item">
                            <label className="mb-10">Email</label>
                            <Link className="tp-line-white" href="mailto:hello@gmail.com">hello@gmail.com</Link>
                        </div>
                        <div className="tp-offcanvas-2-right-info-item">
                            <label className="mb-10">Address</label>
                            <Link className="tp-line-white" href="https://www.google.com.bd/maps/@23.7806365,90.4193257,12z?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank">
                                602 Elgin St. Celina, Delaware <br /> 1009
                            </Link>
                        </div>
                        <div className="tp-offcanvas-2-right-info-item">
                            <label className="mb-15">Follow us</label>
                            <div className="tp-offcanvas-2-right-social">
                                <Link href="#"><DribbleTwo /></Link>{" "}
                                <Link href="#"><TwitterTwo /></Link>{" "}
                                <Link href="#"><InstagramSvg /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileOffcanvas;