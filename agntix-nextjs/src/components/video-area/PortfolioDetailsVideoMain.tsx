"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PortfolioDetailsVideoMain = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);
  const [time, setTime] = useState("0:00");
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const progress = progressRef.current;

    if (!video || !progress) return;

    const updateProgress = () => {
      if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        progress.value = percent;

        // Format time (MM:SS)
        const minutes = Math.floor(video.currentTime / 60);
        const seconds = Math.floor(video.currentTime % 60)
          .toString()
          .padStart(2, "0");
        setTime(`${minutes}:${seconds}`);
      }
    };

    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="project-details-2-area pt-120">
      <div className="container container-1430">
        <div className="row">
          <div className="col-xl-12">
            <div className="project-details-video p-relative">
              <video
                id="video"
                ref={videoRef}
                className="play-video"
                loop
                muted
                autoPlay
                playsInline
              >
                <source
                  src="https://html.aqlova.com/videos/liko/liko.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="video-progress-btn-wrap">
                <label id="timer" htmlFor="progress">
                  {time} Seconds
                </label>
                <button
                  className="video_progress_btn"
                  id="play"
                  aria-label="Play"
                  onClick={togglePlay}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>
                <progress id="progress" ref={progressRef} max="100" value="0">
                  Progress
                </progress>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay and navigation section*/}
      <div className="project-details-video-overlay z-index-9">
        <div className="container">
          <div className="project-details-video-style">
            <div className="row align-items-start">
              <div className="col-xl-12">
                <div className="project-details-1-info-wrap mb-120 flex-wrap d-flex justify-content-between align-items-center">
                  <div className="project-details-1-info">
                    <span>Client</span>
                    <h4>AgntixTheme</h4>
                  </div>
                  <div className="project-details-1-info">
                    <span>Agency</span>
                    <h4>Leo Burnett, Dubai</h4>
                  </div>
                  <div className="project-details-1-info">
                    <span>Services</span>
                    <h4>UI / UX Design</h4>
                  </div>
                  <div className="project-details-1-info">
                    <span>Production</span>
                    <h4>Good People</h4>
                  </div>
                  <div className="project-details-1-info">
                    <span>Date</span>
                    <h4>October {"'2025"}</h4>
                  </div>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="project-details-1-title-box pb-50">
                  <span className="project-details-1-subtitle">
                    <i>01</i>Shooting
                  </span>
                  <h4 className="project-details-1-title">Perspective</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Ultrices malesuada
                    sed volutpat elit cum. Viverra dolor maecenas amet dui.{" "}
                    <br /> Netus aliquet nunc netus cras eu eget erat risus.
                    Ipsum ac imperdiet urna nunc. Rutrum lorem integer. Express
                    the human <br /> touch and the artisanal approach that are
                    central to the brand and ensure client project will be both
                    totally unique and <br /> exceptionally well built. Present
                    the huge selection of styles,
                  </p>
                </div>
              </div>
            </div>
            <div className="project-details-1-navigation d-flex justify-content-between align-items-center">
              <Link className="project-details-1-prev" href="#">
                <i className="fa-sharp fa-regular fa-arrow-left"></i>
                <span>Prev</span>
              </Link>
              <Link href="#">
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="17" cy="3" r="3" fill="currentcolor" />
                    <circle cx="3" cy="3" r="3" fill="currentcolor" />
                    <circle cx="3" cy="17" r="3" fill="currentcolor" />
                    <circle cx="17" cy="17" r="3" fill="currentcolor" />
                  </svg>
                </span>
              </Link>
              <Link className="project-details-1-next" href="#">
                <span>Next</span>
                <i className="fa-sharp fa-regular fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailsVideoMain;
