import Image from "next/image"
import React from "react"
// image
import PngFileIcon from "public/attachment/png-icon.png"
// type
import type { ImageIconPros } from "./types"

export const PngIcon: React.FC<ImageIconPros> = ({ width, height }) => (
    <Image src={PngFileIcon} height={height} width={width} alt="PngFileIcon" />
)
