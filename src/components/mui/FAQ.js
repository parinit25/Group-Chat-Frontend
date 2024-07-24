import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
          fontFamily: "Poppins",
          fontSize: "3.5rem",
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography
              component="h3"
              variant="subtitle2"
              sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}
            >
              How do I create a group chat?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                maxWidth: { sm: "100%", md: "70%" },
                fontFamily: "Poppins",
                fontSize: "1.2rem",
              }}
            >
              To create a group chat, click on the "New Group" button, add a
              group name and description, and then select the participants you
              want to add. As the creator, you will be assigned as the admin of
              the group.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography
              component="h3"
              variant="subtitle2"
              sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}
            >
              How do I add people to a group chat?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                maxWidth: { sm: "100%", md: "70%" },
                fontFamily: "Poppins",
                fontSize: "1.2rem",
              }}
            >
              As a group admin, you can add people by navigating to the group
              settings and selecting "Add Participants". From there, you can
              search for users and add them to the group.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography
              component="h3"
              variant="subtitle2"
              sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}
            >
              Can I search for individuals on the platform and chat with them
              directly?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                maxWidth: { sm: "100%", md: "70%" },
                fontFamily: "Poppins",
                fontSize: "1.2rem",
              }}
            >
              Yes, you can use the search feature to find individuals on the
              platform. Once you find the person you are looking for, you can
              start a direct chat with them by clicking on their profile and
              selecting the "Message" button.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography
              component="h3"
              variant="subtitle2"
              sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}
            >
              How do I send messages in a group chat?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                maxWidth: { sm: "100%", md: "70%" },
                fontFamily: "Poppins",
                fontSize: "1.2rem",
              }}
            >
              To send a message in a group chat, navigate to the group chat in
              your chats list, type your message in the input field at the
              bottom of the screen, and hit "Send". All group members will be
              able to see your message.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5d-content"
            id="panel5d-header"
          >
            <Typography
              component="h3"
              variant="subtitle2"
              sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}
            >
              How can I assign or remove admin rights in a group?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                maxWidth: { sm: "100%", md: "70%" },
                fontFamily: "Poppins",
                fontSize: "1.2rem",
              }}
            >
              As a group admin, you can assign or remove admin rights by
              navigating to the group settings, selecting "Group Members", and
              then selecting the user you want to assign or remove admin rights
              from. You will see an option to "Make Admin" or "Remove Admin".
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
