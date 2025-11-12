import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Select from 'react-select';
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from '@monaco-editor/react';
import { IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { GoogleGenAI } from "@google/genai";
import { toast } from 'react-toastify';
import { IoMdCode } from "react-icons/io";
import { FaEye } from "react-icons/fa";



const Home = () => {
    const options = [
        { value: 'html-css', label: 'HTML + CSS' },
        { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
        { value: 'html-bootstrap', label: 'HTML + Bootstrap' },
        { value: 'html-css-js', label: 'HTML + CSS + JS' },
    ];

    const [outputScreen, setOutputScreen] = useState(false);
    const [tab, setTab] = useState(1);
    const [prompt, setPrompt] = useState("");
    const [framework, setFramework] = useState(options[0]);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    function extractCode(response) {
        const match = response.match(/```(?:\w+)?\n([\s\S]*?)```/);
        return match ? match[1].trim() : response.trim();
    }

    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY });


    let lastCallTime = 0;

    async function getResponse() {
        const now = Date.now();
        const elapsed = now - lastCallTime;

        if (elapsed < 6000) {
            await new Promise((r) => setTimeout(r, 6000 - elapsed));
        }

        lastCallTime = Date.now();

        try {
            setLoading(true);
            const response = await ai.models.generateContent({
                model: "gemini-1.5-flash",
                contents: `You are an experienced senior web developer and UI/UX designer with deep expertise in modern frontend technologies, responsive design, and animation. 
                Generate a complete and high-quality UI component based on the following user input:
                 - **Component Description:** ${prompt}
                 - **Framework:** ${framework.value} 
                ### Requirements: 
                - Write clean, semantic, and well-structured code following best practices. 
                - Use the specified framework only. - Ensure the design is **modern, fully responsive, and animated**. 
                - Include smooth **hover effects, transitions, and shadows**. 
                - Use **elegant colors, spacing, and typography** for visual appeal. 
                - Optimize for **SEO and accessibility (a11y)** where applicable. 
                - Do not include external explanations, comments, or text — **output only the complete code**. 
                - Return the code properly formatted inside a **Markdown fenced code block**.`,
            });
            setCode(extractCode(response.text));
            setOutputScreen(true);
        } catch (error) {
            console.error(error);
            toast.error("Error generating code");
        } finally {
            setLoading(false);
        }
    }


    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(code);
            toast.success("Code copied successfully");
        } catch {
            toast.error("Failed to copy");
        }
    };

    function downloadFile() {
        const fileName = "GenUI-Code.html";
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
        toast.success("File downloaded");
    }

    const refreshPreview = () => {
        setRefreshKey(prev => prev + 1);
        toast.info("Preview refreshed");
    };

    const openInNewTab = () => {

        const newWindow = window.open();
        const fullHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Preview</title>
      <style>
        /* Optional reset for cleaner look */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: 'Inter', sans-serif;
          background: #f9f9f9;
          color: #222;
          overflow-x: hidden;
        }
      </style>
    </head>
    <body>
      ${code}
    </body>
    </html>
  `;

        newWindow.document.open();
        newWindow.document.write(fullHTML);
        newWindow.document.close();
    };


    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0e0e10] text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />

            <div className="flex flex-col lg:flex-row flex-1 items-start justify-between gap-8 px-4 md:px-12 py-10 w-full">
                {/* LEFT SECTION */}
                <div className="left w-full lg:w-1/2 bg-white dark:bg-[#141319] rounded-xl p-6 shadow-md border border-gray-200 dark:border-zinc-800 transition-colors duration-300">
                    <h3 className="text-[26px] font-semibold mb-3 text-gray-900 dark:text-white">
                        AI Component Generator
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-[16px] mb-6">
                        Describe your component and let AI generate the complete code for you.
                    </p>

                    <p className='text-[15px] font-[700] mb-2 text-gray-800 dark:text-gray-200'>Select Framework:</p>
                    <Select
                        options={options}
                        value={framework}
                        placeholder="Select a framework..."
                        classNames={{
                            control: ({ isFocused }) =>
                                `border ${isFocused ? 'border-gray-400' : 'border-gray-300 dark:border-gray-700'} 
                   bg-gray-50 dark:bg-[#0b0b0d] text-gray-800 dark:text-white rounded-md shadow-sm hover:border-gray-400 
                   min-h-[48px] px-2`,
                            menu: () =>
                                'bg-white dark:bg-[#0b0b0d] border border-gray-200 dark:border-gray-700 rounded-md mt-2 z-50 shadow-lg',
                            option: ({ isFocused, isSelected }) =>
                                `cursor-pointer px-4 py-2 text-[15px] ${isSelected
                                    ? 'bg-purple-600 text-white'
                                    : isFocused
                                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                        : 'bg-transparent text-gray-900 dark:text-gray-200'
                                }`,
                            singleValue: () => 'text-gray-900 dark:text-white',
                            placeholder: () => 'text-gray-400 dark:text-gray-500',
                            input: () => 'text-gray-900 dark:text-white',
                        }}
                        unstyled
                        onChange={(e) => setFramework(e)}
                    />

                    <p className='text-[15px] font-[700] mt-5 text-gray-800 dark:text-gray-200'>Describe your component in detail:</p>
                    <textarea
                        onChange={(e) => setPrompt(e.target.value)}
                        value={prompt}
                        className='w-full mt-2 min-h-[200px] rounded-xl bg-gray-100 dark:bg-[#09090B] p-[10px] text-gray-900 dark:text-white resize-none border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-500'
                        style={{ whiteSpace: "pre-wrap" }}
                        placeholder={`Examples:\n• A modern login form with gradient button and smooth hover.\n• A pricing card with three tiers and animations.\n• A navbar with dropdown and smooth transitions.`}
                    ></textarea>

                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                        <p className='text-gray-500 dark:text-gray-400 text-[14px]'>
                            Click “Generate” to create your component.
                        </p>
                        <button
                            onClick={getResponse}
                            className="generate flex items-center p-3 rounded-lg border-0 bg-gradient-to-r from-purple-400 to-purple-600 px-4 gap-2 text-white hover:opacity-80 transition-all"
                        >
                            {loading ? <ClipLoader size={15} color='white' /> : <BsStars />}
                            Generate
                        </button>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="right w-full lg:w-1/2 bg-white dark:bg-[#141319] rounded-xl shadow-md overflow-hidden flex flex-col h-[80vh] border border-gray-200 dark:border-zinc-800 transition-colors duration-300">
                    {!outputScreen ? (
                        <div className="w-full h-full flex items-center flex-col justify-center p-6 text-center">
                            <div className="flex items-center justify-center text-[30px] p-[20px] w-[70px] h-[70px] rounded-full bg-gradient-to-r from-purple-400 to-purple-600">
                                <HiOutlineCode color='white' />
                            </div>
                            <p className='text-[16px] dark:text-gray-400 mt-3'>
                                Your generated code and preview will appear here.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Tabs */}
                            <div className="bg-gray-100 dark:bg-[#17171c] flex transition-colors duration-300">
                                <button onClick={() => setTab(1)} className={`w-1/2 p-[12px] rounded-tl-xl transition-all flex items-center justify-center gap-2 ${tab === 1 ? "bg-gray-200 dark:bg-[#333]" : ""}`}>
                                    <IoMdCode /> Code
                                </button>
                                <button onClick={() => setTab(2)} className={`w-1/2 p-[12px] rounded-tr-xl transition-all flex items-center justify-center ${tab === 2 ? "bg-gray-200 dark:bg-[#333]" : ""}`}>
                                    <FaEye /> Preview
                                </button>
                            </div>

                            {/* Header */}
                            <div className="bg-gray-100 dark:bg-[#17171c] flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300">
                                <p className='font-semibold text-gray-900 dark:text-white text-[15px]'>
                                    {tab === 1 ? "Code Editor" : "Live Preview"}
                                </p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    {tab === 1 ? (
                                        <>
                                            <button title="Copy Code" className="w-[40px] h-[40px] rounded-xl hover:bg-gray-200 dark:hover:bg-[#333] flex items-center justify-center text-gray-800 dark:text-white" onClick={copyCode}>
                                                <IoCopy />
                                            </button>
                                            <button title="Export File" className="w-[40px] h-[40px] rounded-xl hover:bg-gray-200 dark:hover:bg-[#333] flex items-center justify-center text-gray-800 dark:text-white" onClick={downloadFile}>
                                                <PiExportBold />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button title="Open in New Tab" className="w-[40px] h-[40px] rounded-xl hover:bg-gray-200 dark:hover:bg-[#333] flex items-center justify-center text-gray-800 dark:text-white" onClick={openInNewTab}>
                                                <ImNewTab />
                                            </button>
                                            <button title="Refresh Preview" className="w-[40px] h-[40px] rounded-xl hover:bg-gray-200 dark:hover:bg-[#333] flex items-center justify-center text-gray-800 dark:text-white" onClick={refreshPreview}>
                                                <FiRefreshCcw />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Code / Preview */}
                            <div className="flex-1 overflow-hidden">
                                {tab === 1 ? (
                                    <Editor
                                        height="100%"
                                        theme={document.documentElement.classList.contains('dark') ? 'vs-dark' : 'light'}
                                        language="html"
                                        value={code}
                                        onChange={(val) => setCode(val)}
                                    />
                                ) : (
                                    <iframe
                                        key={refreshKey}
                                        srcDoc={code}
                                        className="w-full h-full bg-white dark:bg-[#0e0e10] border-none"
                                        title="Preview"
                                    ></iframe>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
