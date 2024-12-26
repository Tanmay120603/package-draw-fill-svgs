# DrawSvg

A React component for animating the drawing of SVG paths with customizable stroke and fill animations. This package is ideal for creating dynamic and visually engaging SVG illustrations.

---

## 🎥 How It Works (Video Demo)

*Watch the video below to understand how to use and implement the `DrawSvg` component.*

[![DrawSvg Video Demo](https://via.placeholder.com/800x450.png?text=Video+Placeholder)](https://www.example.com)  
(*Video coming soon!*)

---

## 📖 Overview

The `DrawSvg` component animates the drawing (`stroke`) and filling (`fill`) of `path` elements inside an `svg` element. It calculates the length of each path dynamically and applies CSS animations for the specified stroke and fill styles.

⚠️ **Note:** This component must be wrapped inside an `<svg>` element. Using it outside an `svg` element will result in errors because the component returns `path` elements.

---

## ✨ Features

- **Customizable Stroke Animation:** Configure stroke color, width, delay, and duration.
- **Dynamic Fill Animation:** Specify fill color, delay, and duration.
- **Flexible:** Handles multiple nested paths within child components.
- **Reusable:** Works with any SVG paths you want to animate.

---

## 📦 Installation

```bash
npm install draw-fill-svgs
```

---

## 🚀 Usage

### Basic Example

```jsx
import React from "react";
import DrawSvg from "draw-fill-svgs";

function App() {
  const drawStyle = {
    stroke: "blue",
    strokeWidth: "2px",
    delay: "0s",
    duration: "2s",
    fillMode: "forwards",
  };

  const fillStyle = {
    fill: "red",
    delay: "2s",
    duration: "2s",
    fillMode: "forwards",
  };

  return (
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <DrawSvg drawStyle={drawStyle} fillStyle={fillStyle}>
        <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" />
      </DrawSvg>
    </svg>
  );
}

export default App;
```

---

## 🛠 Props

### `drawStyle`

Defines the animation properties for the stroke (drawing animation).

| **Property**   | **Type** | **Description**                                   | **Default**     |
| -------------- | -------- | ------------------------------------------------- | --------------- |
| `stroke`       | `string` | Color of the stroke.                              | `null`          |
| `strokeWidth`  | `string` | Width of the stroke.                              | `null`          |
| `delay`        | `string` | Delay before the stroke animation starts.         | `null`          |
| `duration`     | `string` | Duration of the stroke animation.                 | `null`          |
| `fillMode`     | `string` | CSS fill mode (`forwards`, `backwards`, etc.).     | `"forwards"`    |
| `timingFunction`     | `string` | CSS timing function (`ease`, `linear`, etc.).     | `"ease"`    |

---

### `fillStyle`

Defines the animation properties for the fill (filling animation).

| **Property**   | **Type** | **Description**                                   | **Default**     |
| -------------- | -------- | ------------------------------------------------- | --------------- |
| `fill`         | `string` | Color to fill the path after stroke animation.    | `null`          |
| `delay`        | `string` | Delay before the fill animation starts.           | `null`          |
| `duration`     | `string` | Duration of the fill animation.                   | `null`          |
| `fillMode`     | `string` | CSS fill mode (`forwards`, `backwards`, etc.).     | `"forwards"`    |
| `timingFunction`     | `string` | CSS timing function (`ease`, `linear`, etc.).     | `"ease"`    |


---

## 📝 Notes

1. **SVG Wrapping Required:** The `DrawSvg` component must be wrapped inside an `<svg>` element for proper functionality. If not, it will throw an error as the `path` elements require a parent `svg`.
   
2. **Path Detection:** The component dynamically detects all `path` elements within its children (even nested ones) and applies animations to them.

3. **Fallback Message:** If no `path` elements are provided as children, the component will render a fallback message.

---

## 🎨 Advanced Example with Nested Paths

```jsx
import React from "react";
import DrawSvg from "draw-fill-svgs";

function ComplexSvg() {
  const drawStyle = {
    stroke: "purple",
    strokeWidth: "2px",
    delay: "1s",
    duration: "3s",
    fillMode: "forwards",
  };

  const fillStyle = {
    fill: "orange",
    delay: "4s",
    duration: "2s",
    fillMode: "forwards",
  };

  return (
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <DrawSvg drawStyle={drawStyle} fillStyle={fillStyle}>
        <g>
          <path d="M50 150 Q 100 50, 150 150 T 250 150" />
          <path d="M100 200 L200 200" />
        </g>
      </DrawSvg>
    </svg>
  );
}

export default ComplexSvg;
```

---

## 🧪 Debugging

- If animations do not run, check if the `svg` and `path` elements are correctly structured.
- Ensure the `drawStyle` and `fillStyle` properties are valid and well-formed.