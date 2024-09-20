# React Microphone Record Button

A stylish and functional microphone recording component for React applications, featuring a glassmorphism design.

## Features

- Start and stop audio recording
- Display recording time
- Audio playback
- Download recorded audio
- Glass morphism UI design

## Installation

1. Clone this repository or copy the component files into your React project.

2. Install required dependencies:

```bash
npm install react-glassmorphic-mic-recorder
```
OR

```bash
yarn add react-glassmorphic-mic-recorder
```

## Usage

1. Import the component in your React application:

```jsx
import ReactMicroPhoneRecordButton from 'react-microphone-record-button';
```

2. Use the component in your JSX:

```jsx
function App() {
  return (<div className="App">
      <h1>Audio Recorder</h1>
      <ReactMicroPhoneRecordButton />
    </div>
  );
}
```
## Styling

The component uses a glassmorphism design. To ensure the effect works properly, add the following CSS to your project's global styles:

```css
body {
    background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Arial', sans-serif;
}
```

The component's styles are defined in `ReactMicroPhoneRecordButton.css`. You can customize the appearance by modifying the CSS variables:

```css
:root {
    --glass-bg: rgba(255, 255, 255, 0.25);
    --glass-border: rgba(255, 255, 255, 0.18);
    --text-color: rgba(255, 255, 255, 0.8);
    --accent-blue: rgba(0, 149, 255, 0.7);
    --accent-red: rgba(255, 69, 58, 0.7);
    --accent-green: rgba(52, 199, 89, 0.7);
}
```

## Component Structure

The component is structured as follows:

```jsx
<div className="record-button-container">
    <div className="button-group">
        <button className="record-button">
            { /Record Stop button content /}
        </button>
        {/ Timer display (when recording) /}
        {/ Audio preview and download button (when recording is complete) /}
    </div>
</div>
```

## Browser Support

This component uses the `MediaRecorder` API, which is supported in modern browsers. The glassmorphism effect uses `backdrop-filter`, which may not be supported in all browsers. Please check browser compatibility and consider fallbacks if necessary.

## Customization

You can customize the component by modifying the CSS in `ReactMicroPhoneRecordButton.css`. The glassmorphism effect can be adjusted by changing the `background`, `backdrop-filter`, and `box-shadow` properties.

## Known Issues

- The `backdrop-filter` property used for the glassmorphism effect may not work in all browsers.
- Ensure proper microphone permissions are granted in the browser for the recording functionality to work.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.

## License

This project is open source and available under the [MIT License](https://github.com/pradeepvish1213/react-glassmorphic-mic-recorder?tab=MIT-1-ov-file).

---


Enjoy using the React Microphone Record Button! If you have any questions or need further assistance, please don't hesitate to reach out [Pradeep Vishwakarma](https://github.com/pradeepvish1213).

