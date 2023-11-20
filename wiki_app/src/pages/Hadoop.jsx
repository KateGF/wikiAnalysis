import React from 'react';

const Hadoop = ({ logData }) => {
    return (
        <div>
            <div>
                <strong>Job Info:</strong>
                <p>Timestamp: {logData.job_info.timestamp}</p>
                <p>Level: {logData.job_info.level}</p>
                <p>Message: {logData.job_info.message}</p>
            </div>

            <div>
                <strong>Job Status:</strong>
                <p>Timestamp: {logData.job_status.timestamp}</p>
                <p>Level: {logData.job_status.level}</p>
                <p>Message: {logData.job_status.message}</p>
            </div>

            <div>
                <strong>Counters:</strong>
                <p>Timestamp: {logData.counters.timestamp}</p>

                {/* File System Counters */}
                <div>
                    <strong>File System Counters:</strong>
                    <p>File Bytes Read: {logData.counters.file_system.file.bytes_read}</p>
                    <p>File Bytes Written: {logData.counters.file_system.file.bytes_written}</p>
                    {/* Add more file system counters as needed */}
                </div>

                {/* Job Counters */}
                <div>
                    <strong>Job Counters:</strong>
                    <p>Launched Map Tasks: {logData.counters.job_counters.launched_map_tasks}</p>
                    <p>Launched Reduce Tasks: {logData.counters.job_counters.launched_reduce_tasks}</p>
                    {/* Add more job counters as needed */}
                </div>

                {/* Map-Reduce Framework */}
                <div>
                    <strong>Map-Reduce Framework:</strong>
                    <p>Map Input Records: {logData.counters.map_reduce_framework.map_input_records}</p>
                    <p>Map Output Records: {logData.counters.map_reduce_framework.map_output_records}</p>
                    {/* Add more map-reduce framework information as needed */}
                </div>

                {/* Shuffle Errors */}
                <div>
                    <strong>Shuffle Errors:</strong>
                    <p>Bad ID: {logData.counters.shuffle_errors.bad_id}</p>
                    <p>Connection: {logData.counters.shuffle_errors.connection}</p>
                    {/* Add more shuffle errors as needed */}
                </div>

                {/* File Input Format Counters */}
                <div>
                    <strong>File Input Format Counters:</strong>
                    <p>Bytes Read: {logData.counters.file_input_format_counters.bytes_read}</p>
                </div>

                {/* File Output Format Counters */}
                <div>
                    <strong>File Output Format Counters:</strong>
                    <p>Bytes Written: {logData.counters.file_output_format_counters.bytes_written}</p>
                </div>
            </div>
        </div>
    );
};

export default Hadoop;
