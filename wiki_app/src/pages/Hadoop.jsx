import React from 'react';

const Hadoop = ({ logData }) => {
    return (
        <div className="hadoop-container">
            <div className="section">
                <h2>Job Info:</h2>
                <div className="info">
                    <p><span>Timestamp:</span> {logData.job_info.timestamp}</p>
                    <p><span>Level:</span> {logData.job_info.level}</p>
                    <p><span>Message:</span> {logData.job_info.message}</p>
                </div>
            </div>

            <div className="section">
                <h2>Job Status:</h2>
                <div className="info">
                    <p><span>Timestamp:</span> {logData.job_status.timestamp}</p>
                    <p><span>Level:</span> {logData.job_status.level}</p>
                    <p><span>Message:</span> {logData.job_status.message}</p>
                </div>
            </div>

            <div className="section">
                <h2>Counters:</h2>
                <div className="info">
                    <p><span>Message:</span> {logData.counters.message}</p>
                    <p><span>Level:</span> {logData.counters.level}</p>
                    <p><span>Timestamp:</span> {logData.counters.timestamp}</p>

                    <div className="nested-section">
                        <h3>File System Counters:</h3>
                        <table className="bordered-table">
                            <tbody>
                                <tr>
                                    <td><span>Bytes Read:</span></td>
                                    <td>{logData.counters.file_system.file.bytes_read}</td>
                                </tr>
                                <tr>
                                    <td><span>Bytes Written:</span></td>
                                    <td>{logData.counters.file_system.file.bytes_written}</td>
                                </tr>
                                <tr>
                                    <td><span>Read Operations:</span></td>
                                    <td>{logData.counters.file_system.file.read_operations}</td>
                                </tr>
                                <tr>
                                    <td><span>Large Read Operations:</span></td>
                                    <td>{logData.counters.file_system.file.large_read_operations}</td>
                                </tr>
                                <tr>
                                    <td><span>Write Operations:</span></td>
                                    <td>{logData.counters.file_system.file.write_operations}</td>
                                </tr>
                                {/* Add more file system counters as needed */}
                            </tbody>
                        </table>

                        <div className="info">
                            <h4>HDFS:</h4>
                            <table className="bordered-table">
                                <tbody>
                                    <tr>
                                        <td><span>Bytes Read:</span></td>
                                        <td>{logData.counters.file_system.hdfs.bytes_read}</td>
                                    </tr>
                                    <tr>
                                        <td><span>Bytes Written:</span></td>
                                        <td>{logData.counters.file_system.hdfs.bytes_written}</td>
                                    </tr>
                                    <tr>
                                        <td><span>Read Operations:</span></td>
                                        <td>{logData.counters.file_system.hdfs.read_operations}</td>
                                    </tr>
                                    <tr>
                                        <td><span>Large Read Operations:</span></td>
                                        <td>{logData.counters.file_system.hdfs.large_read_operations}</td>
                                    </tr>
                                    <tr>
                                        <td><span>Write Operations:</span></td>
                                        <td>{logData.counters.file_system.hdfs.write_operations}</td>
                                    </tr>
                                    {/* Add more HDFS counters as needed */}
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className="nested-section">
                        <h3>Job Counters:</h3>
                        <table className="bordered-table">
                            <tbody>
                                <tr>
                                    <td><span>Launched Map Tasks:</span></td>
                                    <td>{logData.counters.job_counters.launched_map_tasks}</td>
                                </tr>
                                <tr>
                                    <td><span>Launched Reduce Tasks:</span></td>
                                    <td>{logData.counters.job_counters.launched_reduce_tasks}</td>
                                </tr>
                                <tr>
                                    <td><span>Data Local Map Tasks:</span></td>
                                    <td>{logData.counters.job_counters.data_local_map_tasks}</td>
                                </tr>
                                <tr>
                                    <td><span>Total Time Maps Occupied Slots (ms):</span></td>
                                    <td>{logData.counters.job_counters.total_time_maps_occupied_slots_ms}</td>
                                </tr>
                                <tr>
                                    <td><span>Total Time Reduces Occupied Slots (ms):</span></td>
                                    <td>{logData.counters.job_counters.total_time_reduces_occupied_slots_ms}</td>
                                </tr>
                                <tr>
                                    <td><span>Total Time All Map Tasks (ms):</span></td>
                                    <td>{logData.counters.job_counters.total_time_all_map_tasks_ms}</td>
                                </tr>
                                <tr>
                                    <td><span>Total Time All Reduce Tasks (ms):</span></td>
                                    <td>{logData.counters.job_counters.total_time_all_reduce_tasks_ms}</td>
                                </tr>
                                {/* Add more job counters as needed */}
                            </tbody>
                        </table>
                    </div>


                    <div className="nested-section">
                        <h3>Map-Reduce Framework:</h3>
                        <table className="bordered-table">
                            <tbody>
                                <tr>
                                    <td><span>Map Input Records:</span></td>
                                    <td>{logData.counters.map_reduce_framework.map_input_records}</td>
                                </tr>
                                <tr>
                                    <td><span>Map Output Records:</span></td>
                                    <td>{logData.counters.map_reduce_framework.map_output_records}</td>
                                </tr>
                                <tr>
                                    <td><span>Map Output Bytes:</span></td>
                                    <td>{logData.counters.map_reduce_framework.map_output_bytes}</td>
                                </tr>
                                <tr>
                                    <td><span>Map Output Materialized Bytes:</span></td>
                                    <td>{logData.counters.map_reduce_framework.map_output_materialized_bytes}</td>
                                </tr>
                                <tr>
                                    <td><span>Input Split Bytes:</span></td>
                                    <td>{logData.counters.map_reduce_framework.input_split_bytes}</td>
                                </tr>
                                <tr>
                                    <td><span>Combine Input Records:</span></td>
                                    <td>{logData.counters.map_reduce_framework.combine_input_records}</td>
                                </tr>
                                <tr>
                                    <td><span>Combine Output Records:</span></td>
                                    <td>{logData.counters.map_reduce_framework.combine_output_records}</td>
                                </tr>
                                <tr>
                                    <td><span>Reduce Input Groups:</span></td>
                                    <td>{logData.counters.map_reduce_framework.reduce_input_groups}</td>
                                </tr>
                                <tr>
                                    <td><span>Reduce Shuffle Bytes:</span></td>
                                    <td>{logData.counters.map_reduce_framework.reduce_shuffle_bytes}</td>
                                </tr>
                                <tr>
                                    <td><span>Reduce Input Records:</span></td>
                                    <td>{logData.counters.map_reduce_framework.reduce_input_records}</td>
                                </tr>
                                <tr>
                                    <td><span>Reduce Output Records:</span></td>
                                    <td>{logData.counters.map_reduce_framework.reduce_output_records}</td>
                                </tr>
                                <tr>
                                    <td><span>Spilled Records:</span></td>
                                    <td>{logData.counters.map_reduce_framework.spilled_records}</td>
                                </tr>
                                <tr>
                                    <td><span>Shuffled Maps:</span></td>
                                    <td>{logData.counters.map_reduce_framework.shuffled_maps}</td>
                                </tr>
                                <tr>
                                    <td><span>Failed Shuffles:</span></td>
                                    <td>{logData.counters.map_reduce_framework.failed_shuffles}</td>
                                </tr>
                                <tr>
                                    <td><span>Merged Map Outputs:</span></td>
                                    <td>{logData.counters.map_reduce_framework.merged_map_outputs}</td>
                                </tr>
                                <tr>
                                    <td><span>GC Time Elapsed (ms):</span></td>
                                    <td>{logData.counters.map_reduce_framework.gc_time_elapsed_ms}</td>
                                </tr>
                                <tr>
                                    <td><span>CPU Time Spent (ms):</span></td>
                                    <td>{logData.counters.map_reduce_framework.cpu_time_spent_ms}</td>
                                </tr>
                                <tr>
                                    <td><span>Physical Memory Bytes Snapshot:</span></td>
                                    <td>{logData.counters.map_reduce_framework.physical_memory_bytes_snapshot}</td>
                                </tr>
                                <tr>
                                    <td><span>Virtual Memory Bytes Snapshot:</span></td>
                                    <td>{logData.counters.map_reduce_framework.virtual_memory_bytes_snapshot}</td>
                                </tr>
                                <tr>
                                    <td><span>Total Committed Heap Usage Bytes:</span></td>
                                    <td>{logData.counters.map_reduce_framework.total_committed_heap_usage_bytes}</td>
                                </tr>
                                {/* Add more map-reduce framework information as needed */}
                            </tbody>
                        </table>
                    </div>


                    <div className="nested-section">
                        <h3>Shuffle Errors:</h3>
                        <table className="bordered-table">
                            <tbody>
                                <tr>
                                    <td><span>Bad ID:</span></td>
                                    <td>{logData.counters.shuffle_errors.bad_id}</td>
                                </tr>
                                <tr>
                                    <td><span>Connection:</span></td>
                                    <td>{logData.counters.shuffle_errors.connection}</td>
                                </tr>
                                <tr>
                                    <td><span>IO Error:</span></td>
                                    <td>{logData.counters.shuffle_errors.io_error}</td>
                                </tr>
                                <tr>
                                    <td><span>Wrong Length:</span></td>
                                    <td>{logData.counters.shuffle_errors.wrong_length}</td>
                                </tr>
                                <tr>
                                    <td><span>Wrong Map:</span></td>
                                    <td>{logData.counters.shuffle_errors.wrong_map}</td>
                                </tr>
                                <tr>
                                    <td><span>Wrong Reduce:</span></td>
                                    <td>{logData.counters.shuffle_errors.wrong_reduce}</td>
                                </tr>
                                {/* Add more shuffle errors as needed */}
                            </tbody>
                        </table>
                    </div>


                    <div className="nested-section">
                        <h3>File Input Format Counters:</h3>
                        <table className="bordered-table">
                            <tbody>
                                <tr>
                                    <td><span>Bytes Read:</span></td>
                                    <td>{logData.counters.file_input_format_counters.bytes_read}</td>
                                </tr>
                                <tr>
                                    <td><span>Read Operations:</span></td>
                                    <td>{logData.counters.file_input_format_counters.read_operations}</td>
                                </tr>
                                <tr>
                                    <td><span>Large Read Operations:</span></td>
                                    <td>{logData.counters.file_input_format_counters.large_read_operations}</td>
                                </tr>
                                <tr>
                                    <td><span>Write Operations:</span></td>
                                    <td>{logData.counters.file_input_format_counters.write_operations}</td>
                                </tr>
                                {/* Add more file input format counters as needed */}
                            </tbody>
                        </table>
                    </div>


                    <div className="nested-section">
                        <h3>File Output Format Counters:</h3>
                        <table className="bordered-table">
                            <tbody>
                                <tr>
                                    <td><span>Bytes Written:</span></td>
                                    <td>{logData.counters.file_output_format_counters.bytes_written}</td>
                                </tr>
                                {/* Add more file output format counters as needed */}
                            </tbody>
                        </table>
                    </div>



                </div>
            </div>
        </div>

    );
};

export default Hadoop;
