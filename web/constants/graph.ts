import { linearGradientDef, Theme } from "@nivo/core"

export const CHARTS_THEME: Theme = {
    background: "transparent",
    textColor: "rgb(var(--color-text-200))",
    axis: {
        domain: {
            line: {
                stroke: "rgb(var(--color-background-80))",
                strokeWidth: 0.5,
            },
        },
    },
    tooltip: {
        container: {
            background: "rgb(var(--color-background-80))",
            color: "rgb(var(--color-text-200))",
            fontSize: "0.8rem",
            border: "1px solid rgb(var(--color-border-300))",
        },
    },
    grid: {
        line: {
            stroke: "rgb(var(--color-border-100))",
        },
    },
}

export const DEFAULT_MARGIN = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
}

export const INDEX_COLORS = ["#FFC53D", "#3E9B4F", "#E5484D", "#80838D", "#CDCED6"]

export const INDEX_GRADIENTS = [
    linearGradientDef("gradient0", [
        { offset: 0, color: "#DEDEDE" },
        { offset: 100, color: "#BABABE" },
    ]),
    linearGradientDef("gradient1", [
        { offset: 0, color: "#D4D4D4" },
        { offset: 100, color: "#878796" },
    ]),
    linearGradientDef("gradient2", [
        { offset: 0, color: "#FFD300" },
        { offset: 100, color: "#FAE270" },
    ]),
    linearGradientDef("gradient3", [
        { offset: 0, color: "#0E8B1B" },
        { offset: 100, color: "#37CB46" },
    ]),
    linearGradientDef("gradient4", [
        { offset: 0, color: "#C90004" },
        { offset: 100, color: "#FF7679" },
    ]),
]
