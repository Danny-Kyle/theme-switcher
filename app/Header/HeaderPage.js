"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
// import { PiArrowRightThin } from "react-icons/pi";

function HeaderPage() {
  const [open, cycleOpen] = useCycle(false, true);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverTheme, setHoverTheme] = useState(null);
  const { theme, systemTheme, setTheme } = useTheme();

  const links = [
    { name: "/public/sun.svg", theme: "light" },
    { name: "/public/moon.svg", theme: "dark" },
    { name: "/public/system.svg", theme: "system" },
  ];

  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
    },
  };
  const sideVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const buttonVariants = {
    closed: {
      height: "1.6rem",
      transition: { duration: 0.4 },
    },
    open: {
      height: "3.7rem",
      transition: { when: "beforeChildren", duration: 0.4 },
    },
  };

  function handleClick() {
    setIsOpen(!isOpen);
    cycleOpen(!open);
  }

  function handleTheme(newTheme) {
    cycleOpen(!open);

    newTheme === "system"
      ? (setHoverTheme("systemTheme"), setTheme(newTheme))
      : newTheme === "light"
      ? (setHoverTheme("lightTheme"), setTheme(newTheme))
      : newTheme === "dark"
      ? (setHoverTheme("darkTheme"), setTheme(newTheme))
      : null;
  }

  return (
    <div>
      <AnimatePresence>
        <motion.header
          key="parent"
          variants={buttonVariants}
          initial="close"
          animate={open ? "open" : "closed"}
          exit={{
            height: 0,
            transition: { delay: 0.7, duration: 0.3 },
          }}
          className="mx-auto w-full z-50 flex justify-center fixed top-0"
        >
          <div className="cursor-pointer bg-[#343434] hover:text-neutral-700 border-neutral-600 border border-t-0 w-[110px] flex flex-col overflow-hidden break-all rounded-b-xl">
            <div
              onClick={() => handleClick()}
              className="text-[12px] text-center mt-1 text-neutral-200 group-hover/sidebar:opacity-100 transition-all font-bold ease-out duration-700"
            >
              {hoverTheme ? (
                <p className="transition-all font-bold ease-out duration-700">
                  {hoverTheme}
                </p>
              ) : (
                <p className="transition-all font-bold ease-out duration-700">
                  Switch Theme
                </p>
              )}
            </div>

            <div className="bg-[#161616] overflow-hidden h-fit rounded-xl mt-1">
              {open && (
                <div className="gap-x-1 flex justify-center">
                  {links.map(({name, theme}, index) => {
                    const isActive = index === activeIndex;
                    return(
                      <>
                      <motion.div key={index} onClick={()=> setActiveIndex(index)} className="relative rounded-md text-neutral-400 flex transition-all ease-in duration-200">
                        {isActive && (
                          <motion.span layoutId="highlight" className="dark:bg-[#ffffff] bg-yellow-500 w-fit top-0 border border-neutral-700/40 absolute inset-0 z-[2] rounded-2xl"></motion.span>
                        )}
                        <Image width="200" height="200" onClick={()=> handleTheme(theme)} onMouseEnter={()=> setHoverTheme(theme)} onMouseLeave={()=> setHoverTheme(null)}
                        className="w-8 h-8 opacity-25 duration-500 transition-all ease-in hover:opacity-100 object-cover rounded-full"
                        src={name} alt={""}/>
                      </motion.div>
                      </>
                    )
                  })}
                </div>
              )}
            </div>

          </div>
        </motion.header>
      </AnimatePresence>
    </div>
  );
}

export default HeaderPage;
