import React from 'react';
import './ErrorComponent.css';

interface ErrorComponentProps {
    description?: string;
    refetch: () => void;
    title?: string;
    showIcon?: boolean;
    buttonText?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
                                                           description = 'Что-то пошло не так',
                                                           refetch,
                                                           title = 'Ошибка!',
                                                           showIcon = true,
                                                           buttonText = 'Повторить'
                                                       }) => {
    const handleRetry = () => {
        refetch();
    };

    return (
        <div className="error-container">
            <div className="error-content">
                {showIcon && (
                    <div className="error-icon">
                        <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M12 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            <circle cx="12" cy="16" r="1" fill="currentColor"/>
                        </svg>
                    </div>
                )}

                <h2 className="error-title">{title}</h2>

                <p className="error-description">{description}</p>

                <button
                    className="error-button"
                    onClick={handleRetry}
                    type="button"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default ErrorComponent;