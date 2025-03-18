"use client";

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const SimpleMarkDown = ({placeholder}:{placeholder: string}) => {
  return <SimpleMDE placeholder={placeholder} />
};

export default SimpleMarkDown;
