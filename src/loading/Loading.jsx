import React from 'react';
import '../provider/spinner.css'

const Loading = () => {
    return (
        <div className="flex justify-center items-center w-full h-[100vh]">
          <svg className="width spinner">
            <text x="50%" y="50%" dy=".35em" >
              HACK-CORRUPTION
            </text>
          </svg>
        </div>
    );
};

export default Loading;