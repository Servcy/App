// nivo
import { CHARTS_THEME, DEFAULT_MARGIN } from "@constants/graph"
import { ResponsiveScatterPlot, ScatterPlotSvgProps } from "@nivo/scatterplot"
import { TGraph } from "./types"

export const ScatterPlotGraph: React.FC<TGraph & Omit<ScatterPlotSvgProps<any>, "height" | "width">> = ({
    height = "400px",
    width = "100%",
    margin,
    theme,
    ...rest
}) => (
    <div style={{ height, width }}>
        <ResponsiveScatterPlot
            margin={{ ...DEFAULT_MARGIN, ...(margin ?? {}) }}
            animate
            theme={{ ...CHARTS_THEME, ...(theme ?? {}) }}
            {...rest}
        />
    </div>
)
