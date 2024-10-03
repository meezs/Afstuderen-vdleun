import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { tokens } from "../../theme";
import { RadialGauge } from "react-canvas-gauges"; // Import the gauge component

const Compare = () => {
  const location = useLocation(); // Retrieve location object
  const { members } = location.state || { members: [] }; // Extract members from state
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const [expanded, setExpanded] = useState(true); 
  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Comparison of Selected Members
      </Typography>

      {members.length === 0 ? (
        <Typography>No members selected for comparison.</Typography>
      ) : (
        members.map((member) => (
          <Accordion key={member.id} sx={{ backgroundColor: "colors.primary[400]", marginBottom: '20px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreOutlinedIcon />}
              sx={{ border: "0.1px solid gray", backgroundColor: colors.primary[400] }}
            >
              <Typography variant="h5" sx={{ color: colors.grey[100] }}>
                {member.name} (ID: {member.ID})
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: colors.primary[400] }}>
              <Typography sx={{ color: colors.grey[100] }}>
                <strong>Type:</strong> {member.Type}<br />
                <strong>Status:</strong> {member.Status}<br />
                <strong>Data:</strong> {member.Data}<br />
              </Typography>

              {/* Gauge Component */}
              <Box display="flex" justifyContent="center" mt={2}>
                <RadialGauge
                 // value={member.amp} // Replace with your logic to get the value
                  width={300}
                  height={300}
                  units="Kw"
                  borders={true}
                  minValue={0} // Define the minimum value
                  maxValue={25} // Define the maximum value
                  majorTicks={["0", "5", "10", "15", "20", "25"]} // Major tick marks
                  minorTicks={2} // Minor tick marks between major ticks
                  value={parseFloat(member.amp).toFixed(3).replace(/^0+(?=\d)/, '')} // Remove leading zeros
                  // colorZone={[
                  //     { from: 0, to: 5, color: "green" },    // Safe range
                  //     { from: 5, to: 15, color: "Orange" },  // Caution range
                  //     { from: 15, to: 20, color: "red" }      // Danger range
                  // ]}
                  colorZone = "red"
                  colorPlate={colors.grey[600]} // Background color of the gauge
                  colorNeedle= "#42EAEA" // Needle color
                  colorNeedleEnd="#42EAEA"
                  colorNeedleCircleOuter="black"
                  needleWidth = "3"
                  colorMajorTicks="White" // Major tick color
                  colorMinorTicks="LightGray" // Minor tick color
                  colorUnits="orange"
                  colorOuterring="primary"
                  colorRing="primary"
                  colorNumbers="White"
                  colorBorderOuter={colors.primary[700]}
                  colorBorderInner={colors.primary[700]}
                  colorBorderCenter={colors.primary[700]}
                  highlights={[
                      { from: 0, to: 10, color: "rgba(50, 200, 50, .3)" },
                      { from: 10, to: 20, color: "rgba(250, 250, 50, .3)" },
                      { from: 20, to: 25, color: "rgba(200, 50, 50, .3)" },
                    ]}
                  needleCircleSize={10} // Size of the needle's center circle
                  animationRule="linear"
                  animationDuration={1500} // Animation duration for 
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}
      
      <Box display="flex" justifyContent="flex-end" mt={2}>
        {/* <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: colors.blueAccent[500] }}
          onClick={() => {
            // Handle any actions you want on button click
          }}
        >
          Take Action
        </Button> */}
      </Box>
    </Box>
  );
};

export default Compare;
    