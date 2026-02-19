import React from 'react';
import './Loader.css';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    color?: string;
    fullScreen?: boolean;
    text?: string;
}

const Loader: React.FC<LoaderProps> = ({
                                           size = 'medium',
                                           color = '#3498db',
                                           fullScreen = false,
                                           text
                                       }) => {
    const loaderClasses = `loader ${size} ${fullScreen ? 'fullscreen' : ''}`;

    return (
        <div className={loaderClasses}>
            <div className="loader-spinner" style={{ borderColor: `${color} transparent transparent transparent` }}>
                <div className="loader-spinner-inner"></div>
            </div>
            {text && <p className="loader-text">{text}</p>}
        </div>
    );
};

export default Loader;