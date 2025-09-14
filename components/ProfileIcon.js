import React from "react";
import styled from "styled-components/native";
import { useUser } from "@clerk/clerk-expo";

const colors = [
  "#FFB6C1", "#87CEFA", "#90EE90", "#FFD700",
  "#FFA07A", "#9370DB", "#40E0D0", "#FF69B4"
];

// Consistent color generator for each user
function getRandomColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
}

// Styled components
const Circle = styled.View`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-color: ${(props) => props.bg};
  align-items: center;
  justify-content: center;
`;

const Letter = styled.Text`
  color: white;
  font-weight: bold;
  font-size: ${(props) => props.size / 2}px;
`;

export default function ProfileIcon({  size = 40 }) {
  const { user } = useUser();
  const firstLetter = user.username[0].toUpperCase();
  const backgroundColor = getRandomColor(user.username);

  return (
    <Circle size={size} bg={backgroundColor}>
      <Letter size={size}>{firstLetter}</Letter>
    </Circle>
  );
}
