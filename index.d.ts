import { ReadStream } from "tty";

// Type definitions for get-buffer v1.0.0
// Project: https://github.com/emilsivervik/get-buffer
// Definitions by: emilsivervik <https://github.com/emilsivervik>

/// <reference types="node" />

export = GetBuffer;

declare namespace GetBuffer {
    type Callback = (error: any, buffer: Buffer) => void;

    /**
     * Synchronous: Reads the specified file into a Buffer. Returns a Buffer.
     * @param {string} filePath The path to the file.
     * @return {Buffer} Returns a Buffer.
     */
    function fromPath(filePath: string);
    /**
     * Synchronous: Reads the specified file into a Buffer, the size of the returning Buffer can be fixed with 2th parameter. Returns a Buffer
     * @param {string} filePath The path to the file.
     * @param {number} bufferLength The size of the Buffer to return.
     * @return {Buffer} Returns a Buffer.
     */
    function fromPath(filePath: string, bufferLength: number | null);

    /**
     * Asynchronous: Reads stream and returns a function<Buffer>.
     * Returning Buffer size can have a max size if bufferLength is passed. 
     * @param {ReadStream} Stream The stream to read Buffer from.
     * @return {Buffer} Returns a Promise<Buffer>.
     */
    function fromStream(stream: ReadStream): Promise<Buffer>;
    /**
     * Asynchronous: Reads stream and returns a function<Buffer>.
     * @param {ReadStream} Stream The stream to read Buffer from.
     * @param {function} callback The callback function to return.
     * @return {function} Returns a callback function.
     */
    function fromStream(stream: ReadStream, callback: Callback);
    /**
     * Asynchronous: Reads stream and returns a function<Buffer>.
     * @param {ReadStream} Stream The stream to read Buffer from.
     * @param {number} bufferLength The size of the Buffer to return.
     * @return {Buffer} Buffer
     */
    function fromStream(stream: ReadStream, bufferLength: number | null): Promise<Buffer>;
    /**
     * Asynchronous: Reads stream and returns a function<Buffer>.
     * Returning Buffer size can have a max size if bufferLength is passed.
     * @param {ReadStream} Stream The stream to read Buffer from.
     * @param {number} bufferLength The size of the Buffer to return.
     * @param {function} callback The callback function to return.
     * @return {function} Returns a callback function.
     */
    function fromStream(stream: ReadStream, bufferLength: number | null, callback: Callback);

    /**
     * Synchronous: Reads ArrayByffer and returns a Buffer.
     * Returning Buffer size can have a max size if bufferLength is passed. 
     * @param {ArrayBuffer} Stream The stream to read Buffer from.
     * @return {Buffer} Returns a Promise<Buffer>.
     */
    function fromArrayBuffer(stream: ReadStream): Buffer;
    /**
     * Synchronous: Reads ArrayByffer and returns a Buffer.
     * Returning Buffer size can have a max size if bufferLength is passed. 
     * @param {ArrayBuffer} Stream The stream to read Buffer from.
     * @param {number} bufferLength The size of the Buffer to return.
     * @return {Buffer} Returns a Promise<Buffer>.
     */
    function fromArrayBuffer(stream: ReadStream, bufferLength: number): Buffer;
}