'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Handle,
  Position,
  useStore
} from 'reactflow';
import 'reactflow/dist/style.css';
import text from '../../../../../../public/assets/flow-image/text.png'
import gallery from '../../../../../../public/assets/flow-image/gallery.png'
import mic from '../../../../../../public/assets/flow-image/mic.png'
import youtube from '../../../../../../public/assets/flow-image/youtube.png'
import file from '../../../../../../public/assets/flow-image/file.png'
import ai from '../../../../../../public/assets/flow-image/ai.png'
import condition from '../../../../../../public/assets/flow-image/condition.png'
import input_flow from '../../../../../../public/assets/flow-image/input_flow.png'
import interactive from '../../../../../../public/assets/flow-image/interactive.png'
import location from '../../../../../../public/assets/flow-image/location.png'
import sequence from '../../../../../../public/assets/flow-image/sequence.png'
import templete from '../../../../../../public/assets/flow-image/templete.png'
import url_button from '../../../../../../public/assets/flow-image/url_button.png'
import whasaap_flows from '../../../../../../public/assets/flow-image/whasaap_flows.png'
import cloud from '../../../../../../public/assets/flow-image/cloud.png'
import save from '../../../../../../public/assets/flow-image/save.png'
import file_upload from '../../../../../../public/assets/flow-image/file_upload.png'
import Image from 'next/image';
import { FaKeyboard } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { Form, Offcanvas, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Select from 'react-select'
import { useRouter } from 'next/navigation';

const MAX_SIZES = {
  image: 5,   // MB
  video: 16,
  file: 100,
}

export default function ReactFlowClient() {

  const router = useRouter()
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedType, setSelectedType] = useState('keyboard');
  const [showConnectorMenu, setShowConnectorMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [fromHandle, setFromHandle] = useState(null);
  const [previewEdge, setPreviewEdge] = useState(null);
  const [within24Hours, setWithin24Hours] = useState(true);
  const [outside24Hours, setOutside24Hours] = useState(false);
  const [freeKeyboardInput, setFreeKeyboardInput] = useState(true);
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [allMatch, setAllMatch] = useState(true);
  const [anyMatch, setAnyMatch] = useState(false);
  const [contextMenu, setContextMenu] = useState(null); // { x, y, nodeId }

  // Prevent to refresh page
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     // Prevent F5
  //     if (e.key === 'F5') {
  //       e.preventDefault();
  //     }

  //     // Prevent Ctrl + R and Ctrl + Shift + R
  //     if (e.ctrlKey && e.key.toLowerCase() === 'r') {
  //       e.preventDefault();
  //     }

  //     // Prevent Cmd + R and Cmd + Shift + R (Mac)
  //     if (e.metaKey && e.key.toLowerCase() === 'r') {
  //       e.preventDefault();
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

  const wasConnectedRef = useRef(false);

  useEffect(() => {
    const defaultNode = {
      id: '1',
      type: 'defaultNode',
      position: { x: 250, y: 150 },
      data: { label: 'Default Node' },
    };
    setNodes([defaultNode]);
  }, [setNodes]);

  const onConnect = useCallback((params) => {
    wasConnectedRef.current = true;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onNodeDoubleClick = useCallback((event, node) => {
    event.stopPropagation();
    setSelectedNode(node);
    setShowOffcanvas(true);
  }, []);

  const CustomInputNode = ({ data, id, type }) => {
    const edges = useStore((state) => state.edges);
    const hasFirstQuestionEdge = edges.some(
      (edge) => edge.source === id && edge.sourceHandle === 'first_question'
    );
    const hasThankyouEdge = edges.some(
      (edge) => edge.source === id && edge.sourceHandle === 'next'
    );

    return (
      <div
        onContextMenu={(event) => {
          event.preventDefault();
          if (setContextMenu) {
            setContextMenu({
              x: event.clientX,
              y: event.clientY,
              nodeId: id,
            });
          }
        }}>
        {
          type === 'defaultNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', fontWeight: '700' }}>☰ Default</h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Reply</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Next' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'interactiveNode' &&
          <div
            style={{
              width: 150,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible'
            }}
          >
            {/* ✅ Invisible target handle to allow connections */}
            <Handle
              type="target"
              position={Position.Left}
              id="target"
              style={{ opacity: 0 }}
            />

            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                borderBottom: '1px dashed #ccc',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <span style={{ fontSize: '8px', marginRight: '2px', fontWeight: '700' }}>📘</span>Interactive
              </h5>
            </div>

            {/* Handles Section */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 10px',
                position: 'relative',
              }}
            >
              {/* Left handle - Reply */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="reply"
                  style={{
                    background: 'rgb(255, 255, 255)',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <div><span style={{ fontSize: '7px' }}>Reply</span></div>
              </div>

              {/* Right handles with labels */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Next' },
                  { id: 'buttons', label: 'Buttons' },
                  { id: 'listmessages', label: 'List Messages' },
                  { id: 'ecommerce', label: 'E-commerce' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div><span style={{ fontSize: '7px' }}>{item.label}</span></div>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: 'rgb(255, 255, 255)',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'quickReplyNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', fontWeight: '700' }}>💬 Quick Reply</h5>
            </div>

            {/* Catalog ID Box */}
            <div
              style={{
                margin: '0px 12px 12px 12px',
                padding: '5px 0px',
                border: '1px dashed #a5c8ff',
                backgroundColor: '#e6f0ff',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '13px',
                color: '#004080',
                fontSize: '8px',
              }}
            >
              List Message
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Message</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'single', label: 'Sections' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'sectionNode' &&
          <div
            style={{
              width: '133px',
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}
          >
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', fontWeight: '700' }}>🗂️ Section</h5>
            </div>

            {/* Dashed Divider */}
            <div style={{ borderTop: '1px dashed #ccc' }} />

            {/* Bottom Handles */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 10px',
              position: 'relative'
            }}>
              {/* Left Handle - Setup */}
              <div style={{ position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="setup_sequence"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '8px' }}>Reply</span>
              </div>

              {/* Right Handle - Schedule */}
              <div style={{ position: 'relative', textAlign: 'end' }}>
                <span style={{ fontSize: '8px' }}>Rows</span>
                <Handle
                  type="source"
                  position={Position.Right}
                  id="schedule_sequence"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    right: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
              </div>
            </div>
          </div>
        }

        {
          type === 'rowNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', fontWeight: '700' }}>☰ Row</h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Reply</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Next' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'catalogNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', fontWeight: '700' }}>💬 Catalog</h5>
            </div>

            {/* Catalog ID Box */}
            <div
              style={{
                margin: '0px 12px 12px 12px',
                padding: '5px 0px',
                border: '1px dashed #a5c8ff',
                backgroundColor: '#e6f0ff',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '13px',
                color: '#004080',
                fontSize: '8px',
              }}
            >
              Catalog ID
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Message</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'single', label: 'Single' },
                  { id: 'multiple', label: 'Multiple' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'buttonNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              <h5 className="mb-0 text-bold" style={{ fontSize: '8px', color: 'grey', fontWeight: '700' }}><span style={{ fontSize: '8px', marginRight: '2px' }}><i className="fa-solid fa-arrow-pointer"></i></span>Button</h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Reply</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Next' },
                  { id: 'subscribe_to_sequence', label: 'Subscribe to Sequence' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'ctaUrlButtonNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              <h5 className="mb-0 text-bold" style={{ fontSize: '8px', color: 'grey', fontWeight: '700' }}><span style={{ fontSize: '8px', marginRight: '2px' }}><i className="fa-solid fa-hand-pointer"></i></span> CTA URL Button</h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Reply</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Compose Next Message' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'newSequenceCampaignNode' &&
          <div
            style={{
              width: '133px',
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}
          >
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', fontWeight: '700' }}>🛠️ New Sequence Campaign</h5>
            </div>

            {/* Dashed Divider */}
            <div style={{ borderTop: '1px dashed #ccc' }} />

            {/* Bottom Handles */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 10px',
              position: 'relative'
            }}>
              {/* Left Handle - Setup */}
              <div style={{ position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="setup_sequence"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Set-up New Sequence</span>
              </div>

              {/* Right Handle - Schedule */}
              <div style={{ position: 'relative', textAlign: 'end' }}>
                <span style={{ fontSize: '7px' }}>Schedule Sequence Message</span>
                <Handle
                  type="source"
                  position={Position.Right}
                  id="schedule_sequence"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    right: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
              </div>
            </div>
          </div>
        }

        {
          type === 'sendMessageAfterNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', fontWeight: '700' }}>💧 Send Message After</h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Frequency</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Compose and Schedule Message' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'textNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              {/* <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey' }}>Text</h5> */}
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <span style={{ fontSize: '10px', marginRight: '2px' }}>≡</span> Text
              </h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Message</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Compose Next Message' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'imageNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              {/* <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey' }}>Text</h5> */}
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <span style={{ fontSize: '8px', marginRight: '2px' }}>📷</span>image
              </h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Message</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Compose Next Message' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'videoNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              {/* <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey' }}>Text</h5> */}
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <span style={{ fontSize: '8px', marginRight: '2px' }}>🎥</span>Video
              </h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Message</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Compose Next Message' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'audioNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              {/* <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey' }}>Text</h5> */}
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <span style={{ fontSize: '8px', marginRight: '2px' }}>🔉</span>Audio
              </h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Message</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Compose Next Message' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'fileNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              {/* <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey' }}>Text</h5> */}
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <span style={{ fontSize: '8px', marginRight: '2px' }}>📁</span>File
              </h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Message</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Compose Next Message' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'locationNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              {/* <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey' }}>Text</h5> */}
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <i className="fas fa-map-marked-alt me-1" style={{ fontSize: '9px' }}></i>Location
              </h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Message</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Compose Next Message' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'whatsappFlowNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              {/* <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey' }}>Text</h5> */}
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <i className="fas fa-object-group me-1" style={{ fontSize: '9px' }}></i>Whatsapp Flows
              </h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Message</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Compose Next Message' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'aiReplyNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              {/* <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey' }}>Text</h5> */}
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <i className="fas fa-bars me-1" style={{ fontSize: '9px' }}></i>AI Reply
              </h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Message</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Compose Next Message' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'conditionNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              {/* <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey' }}>Text</h5> */}
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <i className="fa-solid fa-greater-than-equal me-1" style={{ fontSize: '9px' }}></i>Condition
              </h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Reply</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'True' },
                  { id: 'false', label: 'False' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'userInputFlowNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              {/* <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey' }}>Text</h5> */}
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <i className="fas fa-layer-group me-1" style={{ fontSize: '9px' }}></i>User Input Flow
              </h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Reply</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'first_question', label: 'First Question' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'newQuestionNode' &&
          <div
            style={{
              width: 150,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <i className="fas fa-question-circle me-1" style={{ fontSize: '9px' }}></i>New Question
              </h5>
            </div>
            <hr style={{ margin: 0 }} />
            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Question</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
              {[
                { id: 'first_question', label: 'Next Question' },
                { id: 'next', label: 'Thankyou Message' },
              ].map((item, idx) => (
                <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={item.id}
                    style={{
                      background: '#fff',
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      position: 'absolute',
                      right: -14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: '1px solid rgb(73, 73, 73)',
                    }}
                  />
                </div>
              ))}
            </div> */}

              {/* Right Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                {/* CASE: Show ONLY if 'first_question' used OR none used */}
                {(!hasThankyouEdge || (!hasThankyouEdge && !hasFirstQuestionEdge)) && (
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>Next Question</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id="first_question"
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                )}

                {/* CASE: Show ONLY if 'next' used OR none used */}
                {(!hasFirstQuestionEdge || (!hasThankyouEdge && !hasFirstQuestionEdge)) && (
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>Thankyou Message</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id="next"
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        }

        {
          type === 'templateMessageNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              {/* <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey' }}>Text</h5> */}
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', display: 'flex', alignItems: 'center', fontWeight: '700' }}>
                <span style={{ fontSize: '9px', marginRight: '2px' }}><i className="fa-solid fa-palette"></i></span> Template Message
              </h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Message</span>
              </div>

              {/* Right - Single & Multiple Handles */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0 }}>
                {[
                  { id: 'next', label: 'Compose Next Message' },
                ].map((item, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '7px', textAlign: 'end' }}>{item.label}</span>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={item.id}
                      style={{
                        background: '#fff',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        position: 'absolute',
                        right: -14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: '1px solid rgb(73, 73, 73)',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        }

        {
          type === 'productNode' &&
          <div
            style={{
              width: 133,
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', fontWeight: '700' }}>📦 Product</h5>
            </div>

            <hr style={{ margin: 0 }} />

            {/* Handles Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                position: 'relative',
              }}
            >
              {/* Left - Message Handle */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="message"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Reply</span>
              </div>
            </div>
          </div>
        }

        {
          type === 'productSectionNode' &&
          <div
            style={{
              width: '133px',
              border: '1px solid rgb(204, 204, 204)',
              borderRadius: 10,
              background: '#fff',
              fontSize: '10px',
              position: 'relative',
              overflow: 'visible',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}
          >
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'grey',
              }}
            >
              <h5 className="mb-0" style={{ fontSize: '8px', color: 'grey', fontWeight: '700' }}><span><i className="fa-solid fa-table-cells-large me-1"></i></span>Product Section</h5>
            </div>

            {/* Dashed Divider */}
            <div style={{ borderTop: '1px dashed #ccc' }} />

            {/* Bottom Handles */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 10px',
              position: 'relative'
            }}>
              {/* Left Handle - Setup */}
              <div style={{ position: 'relative' }}>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="setup_sequence"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
                <span style={{ fontSize: '7px' }}>Reply</span>
              </div>

              {/* Right Handle - Schedule */}
              <div style={{ position: 'relative', textAlign: 'end' }}>
                <span style={{ fontSize: '7px' }}>Products</span>
                <Handle
                  type="source"
                  position={Position.Right}
                  id="schedule_sequence"
                  style={{
                    background: '#fff',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    position: 'absolute',
                    right: -14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: '1px solid rgb(73, 73, 73)',
                  }}
                />
              </div>
            </div>
          </div>
        }
      </div>
    )

    // fallback for other node types
    // return (
    //   <div
    //     style={{
    //       padding: '10px',
    //       border: '1px solid #ccc',
    //       borderRadius: 10,
    //       background: '#fff',
    //       maxWidth: 200,
    //       position: 'relative',
    //     }}
    //   >
    //     <h5 className='mb-0' style={{ fontSize: '8px', color: 'grey' }}>{data.label}</h5>
    //     <input
    //       readOnly
    //       value={data.text || 'hello'}
    //       style={{ width: '100%', backgroundColor: '#e3e2e2', border: 'none', padding: '2px 5px', fontSize: '9px', borderRadius: '3px' }}
    //     />
    //     <Handle
    //       type="target"
    //       position={Position.Left}
    //       style={{ background: '#fff', width: 6, height: 6, border: '1px solid #494949' }}
    //     />
    //     <Handle
    //       type="source"
    //       position={Position.Right}
    //       style={{ background: '#fff', width: 6, height: 6, border: '1px solid #494949' }}
    //     />
    //   </div>
    // );
  };

  const nodeTypes = useMemo(() => ({
    defaultNode: (props) => <CustomInputNode {...props} type="defaultNode" setContextMenu={setContextMenu} />,
    interactiveNode: (props) => <CustomInputNode {...props} type="interactiveNode" />,
    textNode: (props) => <CustomInputNode {...props} type="textNode" />,
    imageNode: (props) => <CustomInputNode {...props} type="imageNode" />,
    audioNode: (props) => <CustomInputNode {...props} type="audioNode" />,
    videoNode: (props) => <CustomInputNode {...props} type="videoNode" />,
    fileNode: (props) => <CustomInputNode {...props} type="fileNode" />,
    locationNode: (props) => <CustomInputNode {...props} type="locationNode" />,
    whatsappFlowNode: (props) => <CustomInputNode {...props} type="whatsappFlowNode" />,
    conditionNode: (props) => <CustomInputNode {...props} type="conditionNode" />,
    newSequenceCampaignNode: (props) => <CustomInputNode {...props} type="newSequenceCampaignNode" />,
    userInputFlowNode: (props) => <CustomInputNode {...props} type="userInputFlowNode" />,
    newQuestionNode: (props) => <NewQuestionNode {...props} />, // add this
    aiReplyNode: (props) => <CustomInputNode {...props} type="aiReplyNode" />,
    templateMessageNode: (props) => <CustomInputNode {...props} type="templateMessageNode" />,
    ctaUrlButtonNode: (props) => <CustomInputNode {...props} type="ctaUrlButtonNode" />,
    buttonNode: (props) => <CustomInputNode {...props} type="buttonNode" />,
    catalogNode: (props) => <CustomInputNode {...props} type="catalogNode" />,
    sendMessageAfterNode: (props) => <CustomInputNode {...props} type="sendMessageAfterNode" />,
    newQuestionNode: (props) => <CustomInputNode {...props} type="newQuestionNode" />,
    quickReplyNode: (props) => <CustomInputNode {...props} type="quickReplyNode" />,
    sectionNode: (props) => <CustomInputNode {...props} type="sectionNode" />,
    rowNode: (props) => <CustomInputNode {...props} type="rowNode" />,
    productNode: (props) => <CustomInputNode {...props} type="productNode" />,
    productSectionNode: (props) => <CustomInputNode {...props} type="productSectionNode" />,
  }), [setContextMenu]);

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const [uploadedAudioFile, setUploadedAudioFile] = useState(null);

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedAudioFile(file); // Save file to state
    } else {
      alert('Please upload a valid audio file.');
    }
  };

  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [previewURL, setPreviewURL] = useState('');

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setUploadedVideo(file);
      setPreviewURL(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid video file.');
    }
  };

  const [uploadedFile, setUploadedFile] = useState(null);

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && allowedTypes.includes(file.type)) {
      setUploadedFile(file);
    } else {
      alert('Unsupported file type. Please upload a valid document.');
    }
  };

  const options = [
    { value: '', label: 'Select a Flow' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const handleSelect = (type) => {
    setSelectedType(type);
  };

  const [mediaPreview, setMediaPreview] = useState(null);
  const [uploadedType, setUploadedType] = useState('');
  const [error, setError] = useState('');

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = file.type;

    let category = '';
    if (type.startsWith('image/')) category = 'image';
    else if (type.startsWith('video/')) category = 'video';
    else if (
      [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain',
      ].includes(type)
    ) {
      category = 'file';
    } else {
      setError('Unsupported file type.');
      setMediaPreview(null);
      setUploadedType('');
      return;
    }

    const maxSizeMB = MAX_SIZES[category];
    const fileSizeMB = file.size / (1024 * 1024);

    if (fileSizeMB > maxSizeMB) {
      setError(`Max size for ${category} is ${maxSizeMB}MB.`);
      setMediaPreview(null);
      setUploadedType('');
      return;
    }

    setMediaPreview(URL.createObjectURL(file));
    setUploadedType(category);
    setError('');
  };

  const onConnectStart = (event, { nodeId, handleId }) => {
    const previewId = `preview-${Date.now()}`;
    const tempEdge = {
      id: previewId,
      source: nodeId,
      sourceHandle: handleId,
      target: 'floating',
      animated: true,
      style: { stroke: '#007bff', strokeDasharray: '5 5' },
    };
    setFromHandle({ nodeId, handleId });
    setPreviewEdge(tempEdge);
    setEdges((eds) => [...eds, tempEdge]);
  };

  const onConnectEnd = (event) => {
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const isDroppedOnPane = event.target.classList.contains('react-flow__pane');
    if (!fromHandle) return;

    const sourceHandle = fromHandle.handleId;
    const sourceNode = nodes.find((n) => n.id === fromHandle.nodeId);

    // Always remove preview edge
    if (previewEdge) {
      setEdges((eds) => eds.filter((e) => e.id !== previewEdge.id));
      setPreviewEdge(null);
    }

    // ✅ CASE 1: If connection was made to another node → skip everything
    if (wasConnectedRef.current) {
      wasConnectedRef.current = false;
      return;
    }

    // --------------------------------------------
    // ✅ CASE 2: Special Auto-Insert Logic
    // --------------------------------------------
    const addNode = (type, offsetX = 200, offsetY = 0) => {
      const id = `${type}_${Date.now()}`;
      const position = {
        x: sourceNode?.position?.x + offsetX || 300,
        y: sourceNode?.position?.y + offsetY || 150,
      };
      const newNode = { id, type, position, data: {} };
      setNodes((nds) => [...nds, newNode]);
      return id;
    };

    const addEdge = (source, sourceHandle, target) => {
      setEdges((eds) => [
        ...eds,
        {
          id: `e${source}-${sourceHandle}-${target}`,
          source,
          sourceHandle,
          target,
          type: 'default',
        },
      ]);
    };

    console.log("sourceHandle", sourceHandle)

    if (sourceHandle === 'buttons') {
      const buttonNodeId = addNode('buttonNode', 260, 20);
      addEdge(fromHandle.nodeId, 'buttons', buttonNodeId);
      return;
    }

    if (sourceHandle === 'listmessages') {
      const quickReplyId = addNode('quickReplyNode', 260, 60);
      addEdge(fromHandle.nodeId, 'listmessages', quickReplyId);

      const sectionId = addNode('sectionNode', 500, 20);
      addEdge(quickReplyId, 'sections', sectionId);

      [-60, 50, 160].forEach((offsetY, index) => {
        const rowId = `rowNode_${Date.now()}_${index}`;
        const position = {
          x: sourceNode?.position?.x + 740 || 740,
          y: sourceNode?.position?.y + offsetY || 150,
        };
        const newRow = { id: rowId, type: 'rowNode', position, data: {} };
        const newEdge = {
          id: `e${sectionId}-rows-${rowId}`,
          source: sectionId,
          sourceHandle: 'rows',
          target: rowId,
          type: 'default',
        };

        setNodes((nds) => [...nds, newRow]);
        setEdges((eds) => [...eds, newEdge]);
      });

      return;
    }

    // if (sourceHandle === 'subscribe_to_sequence') {
    //   const newSeqId = addNode('newSequenceCampaignNode', 260, 20);
    //   addEdge(fromHandle.nodeId, 'subscribe_to_sequence', newSeqId);

    //   [0, 1, 2].forEach((i) => {
    //     const delayId = addNode('sendMessageAfterNode', 500, i * 100 - 40);
    //     addEdge(newSeqId, 'next', delayId);
    //   });
    //   return;
    // }

    if (sourceHandle === 'subscribe_to_sequence') {
      const newSeqId = addNode('newSequenceCampaignNode', 260, 20);
      addEdge(fromHandle.nodeId, 'subscribe_to_sequence', newSeqId);

      [0, 1, 2].forEach((i) => {
        const sendNodeId = `sendMessageAfterNode_${Date.now()}_${i}`;
        const position = {
          x: sourceNode?.position?.x + 500 || 500,
          y: sourceNode?.position?.y + (i * 100 - 40) || 150,
        };
        const newNode = { id: sendNodeId, type: 'sendMessageAfterNode', position, data: {} };
        const newEdge = {
          id: `e${newSeqId}-next-${sendNodeId}`,
          source: newSeqId,
          sourceHandle: 'next',
          target: sendNodeId,
          type: 'default',
        };

        setNodes((nds) => [...nds, newNode]);
        setEdges((eds) => [...eds, newEdge]);
      });

      return;
    }

    if (sourceHandle === 'ecommerce') {
      const catalogId = addNode('catalogNode', 260, 20);
      addEdge(fromHandle.nodeId, 'ecommerce', catalogId);
      return;
    }

    if (sourceHandle === 'single') {
      const productId = addNode('productNode', 260, 20);
      addEdge(fromHandle.nodeId, 'single', productId);
      return;
    }

    if (sourceHandle === 'multiple') {
      const sectionId = addNode('productSectionNode', 260, 40);
      addEdge(fromHandle.nodeId, 'multiple', sectionId);

      const newProductNodes = [];
      const newProductEdges = [];

      [-60, 50, 160].forEach((offsetY) => {
        const id = `productNode_${Date.now()}_${Math.random()}`;
        const position = {
          x: sourceNode?.position?.x + 500 || 500,
          y: sourceNode?.position?.y + offsetY || 150,
        };
        newProductNodes.push({ id, type: 'productNode', position, data: {} });
        newProductEdges.push({
          id: `e${sectionId}-products-${id}`,
          source: sectionId,
          sourceHandle: 'products',
          target: id,
          type: 'default',
        });
      });

      setNodes((nds) => [...nds, ...newProductNodes]);
      setEdges((eds) => [...eds, ...newProductEdges]);
      return;
    }

    if (sourceHandle === 'first_question' || sourceHandle === 'next_question') {
      const newQuestionId = `newQuestionNode_${Date.now()}`;
      const position = {
        x: sourceNode?.position?.x + 260 || 300,
        y: sourceNode?.position?.y + 60 || 150,
      };
      const newNode = {
        id: newQuestionId,
        type: 'newQuestionNode',
        position,
        data: {},
      };
      const newEdge = {
        id: `e${fromHandle.nodeId}-${sourceHandle}-${newQuestionId}`,
        source: fromHandle.nodeId,
        sourceHandle: sourceHandle,
        target: newQuestionId,
        type: 'default',
      };

      setNodes((nds) => [...nds, newNode]);
      setEdges((eds) => [...eds, newEdge]);
      return;
    }

    // --------------------------------------------
    // ✅ CASE 3: Show Popup (only if dropped on empty canvas)
    // --------------------------------------------
    if (isDroppedOnPane) {
      setMenuPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      setShowConnectorMenu(true);
    }
  };

  const handleNodeCreate = (type, dropPosition = null) => {
    if (!reactFlowInstance) return;

    const isNewSequenceCampaign = type === 'newSequenceCampaignNode';
    const fromHandleActive = !!fromHandle;

    // Case: basic drag-drop from sidebar
    if (!fromHandleActive && !isNewSequenceCampaign) {
      const id = `${type}_${Date.now()}`;
      const newNode = {
        id,
        type,
        position: dropPosition || { x: 100, y: 100 },
        data: { label: `${type} Node` },
      };
      setNodes((nds) => [...nds, newNode]);
      return;
    }

    // Case: don't allow accidental inserts without popup
    if (fromHandleActive && !showConnectorMenu && !isNewSequenceCampaign) {
      return;
    }

    // Case: insert New Sequence Campaign flow
    if (!fromHandleActive && isNewSequenceCampaign) {
      const basePos = dropPosition || { x: 300, y: 200 };
      const campaignId = `newSequenceCampaignNode_${Date.now()}`;
      const campaignNode = {
        id: campaignId,
        type: 'newSequenceCampaignNode',
        position: basePos,
        data: {},
      };

      const sendNodes = [0, 1, 2].map((i) => {
        const id = `sendMessageAfterNode_${Date.now()}_${i}`;
        return {
          id,
          type: 'sendMessageAfterNode',
          position: {
            x: basePos.x + 260,
            y: basePos.y + i * 120,
          },
          data: {},
          edge: {
            id: `e${campaignId}-${id}`,
            source: campaignId,
            sourceHandle: 'set_up_sequence',
            target: id,
            type: 'default',
          },
        };
      });

      setNodes((nds) => [
        ...nds,
        campaignNode,
        ...sendNodes.map((n) => ({
          id: n.id,
          type: n.type,
          position: n.position,
          data: n.data,
        })),
      ]);
      setEdges((eds) => [
        ...eds,
        ...sendNodes.map((n) => n.edge),
      ]);
      return;
    }

    // Case: user selected node from popup → create node + connect
    const sourceNode = nodes.find((n) => n.id === fromHandle.nodeId);
    const position = dropPosition || {
      x: sourceNode?.position.x + 260 || 300,
      y: sourceNode?.position.y + 60 || 150,
    };

    const id = `${type}_${Date.now()}`;
    const newNode = {
      id,
      type,
      position,
      data: { label: `${type} Node` },
    };

    const newEdge = {
      id: `e${fromHandle.nodeId}-${fromHandle.handleId}-${id}`,
      source: fromHandle.nodeId,
      sourceHandle: fromHandle.handleId,
      target: id,
      type: 'default',
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
    setPreviewEdge(null);
    setShowConnectorMenu(false);
  };

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    handleNodeCreate(type, position);
  }, [reactFlowInstance]);

  // Create JSON format
  const handleSubmit = () => {
    console.log("nodes", nodes)
    console.log("edges", edges)

    const phoneNumber = "919999999999";

    const connectedMessages = [];
    console.log("connectedMessages", connectedMessages)

    nodes.forEach((node) => {
      if (
        ["textNode", "imageNode", "audioNode", "videoNode"].includes(node.type)
      ) {
        const messageText = node?.data?.message || "Default message";
        const templateName = node?.data?.templateName || `${node.type}_template`;

        const payload = {
          messaging_product: "whatsapp",
          to: phoneNumber,
          type: "template",
          template: {
            name: templateName,
            language: {
              code: "en_US",
            },
            components: [
              {
                type: "body",
                parameters: [
                  {
                    type: "text",
                    text: messageText,
                  },
                ],
              },
            ],
          },
        };

        connectedMessages.push(payload);
      }
    });

    console.log(
      "Generated Meta WhatsApp Messages JSON:",
      JSON.stringify(connectedMessages, null, 2)
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ReactFlowProvider>
        {/* Right content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <header className="d-flex justify-content-between align-items-center gap-2 p-2 border-bottom bg-light px-5">
            <div className='d-flex gap-2'>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    Text
                  </Tooltip>
                }
              >
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'textNode')} ><Image height={20} width={20} src={text} alt='text-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    Image
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'imageNode')}><Image height={20} width={20} src={gallery} alt='gallery-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    Audio
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'audioNode')}><Image height={20} width={20} src={mic} alt='mic-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    video
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'videoNode')}><Image height={20} width={20} src={youtube} alt='youtube-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    File
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'fileNode')}><Image height={20} width={20} src={file} alt='file-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    Location
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'locationNode')}><Image height={20} width={20} src={location} alt='location-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    Whatsapp Flows
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'whatsappFlowNode')}><Image height={20} width={20} src={whasaap_flows} alt='whasaap_flows-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    Interactive
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'interactiveNode')}><Image height={20} width={20} src={interactive} alt='interactive-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    Condition
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'conditionNode')}><Image height={20} width={20} src={condition} alt='condition-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    New Sequence Campaign
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'newSequenceCampaignNode')}><Image height={20} width={20} src={sequence} alt='sequence-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    User Input Flow
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'userInputFlowNode')}><Image height={20} width={20} src={input_flow} alt='input_flow-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    Ai Reply
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'aiReplyNode')}><Image height={20} width={20} src={ai} alt='ai-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    Template Message
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'templateMessageNode')}><Image height={20} width={20} src={templete} alt='templete-img' /></span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-top">
                    CTA URL Button
                  </Tooltip>
                }>
                <span className="img-bg-color d-flex justify-content-center align-items-center" draggable={true}
                  onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'ctaUrlButtonNode')}><Image height={20} width={20} src={url_button} alt='url_button-img' /></span>
              </OverlayTrigger>
            </div>
            <div>
              {/* <button className='flow-chart-back-btn text-nowrap' onClick={() => router.push('//broadcasting/whatsapp-broadcast/')}><span><i className="fa-solid fa-angles-left"></i></span> Submit</button> */}
              {/* <button className='flow-chart-back-btn text-nowrap' onClick={() => router.push('//broadcasting/whatsapp-broadcast/')}><span><i class="fa-solid fa-floppy-disk"></i></span> Submit</button> */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '4px 16px',
                    backgroundColor: '#1c174f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </header>

          {/* React Flow Canvas */}
          <div
            className="reactflow-wrapper"
            ref={reactFlowWrapper}
            style={{ flex: 1 }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onConnect={onConnect}
              onConnectStart={onConnectStart}
              onConnectEnd={onConnectEnd}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeDoubleClick={onNodeDoubleClick}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>

        {/* Add type wise node Popup */}
        {showConnectorMenu && (
          <div
            style={{
              position: 'absolute',
              left: menuPosition.x,
              top: menuPosition.y,
              background: '#fff',
              boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
              borderRadius: '6px',
              zIndex: 10,
              padding: '5px 0',
              width: 160,
            }}
          >
            {[
              'textNode', 'imageNode', 'videoNode', 'audioNode', 'fileNode',
              'interactiveNode', 'ctaUrlButtonNode', 'locationNode', 'whatsappFlowNode',
              'aiReplyNode', 'conditionNode', 'userInputFlowNode', 'templateMessageNode'
            ].map((type) => (
              <div
                key={type}
                onClick={() => handleNodeCreate(type)}
                style={{
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: '#007bff',
                }}
              >
                {type.replace('Node', '').replace(/([A-Z])/g, ' $1')}
              </div>
            ))}
            <div
              onClick={() => setShowConnectorMenu(false)}
              style={{
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: '12px',
                color: 'red',
                borderTop: '1px solid #eee'
              }}
            >
              Cancel
            </div>
          </div>
        )}

        {/* Clone And Delete Button */}
        {contextMenu && (
          <div
            style={{
              position: 'absolute',
              top: contextMenu.y,
              left: contextMenu.x,
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 9999,
              width: 140,
            }}
          >
            <div
              style={{ padding: '8px 16px', cursor: 'pointer' }}
              onClick={() => {
                const getAllConnectedNodes = (nodeId, allEdges, visited = new Set()) => {
                  visited.add(nodeId);
                  const connectedTargets = allEdges
                    .filter((e) => e.source === nodeId)
                    .map((e) => e.target);

                  connectedTargets.forEach((targetId) => {
                    if (!visited.has(targetId)) {
                      getAllConnectedNodes(targetId, allEdges, visited);
                    }
                  });

                  return visited;
                };

                setNodes((nds) => {
                  const allToDelete = getAllConnectedNodes(contextMenu.nodeId, edges);
                  return nds.filter((node) => !allToDelete.has(node.id));
                });

                setEdges((eds) => {
                  const allToDelete = getAllConnectedNodes(contextMenu.nodeId, edges);
                  return eds.filter(
                    (e) => !allToDelete.has(e.source) && !allToDelete.has(e.target)
                  );
                });

                setContextMenu(null);
              }}
            >
              Delete
            </div>
            <div
              style={{ padding: '8px 16px', cursor: 'pointer' }}
              onClick={() => {
                setNodes((nds) => {
                  const original = nds.find((n) => n.id === contextMenu.nodeId);
                  if (!original) return nds;

                  const newNode = {
                    ...original,
                    id: `clone_${Date.now()}`,
                    position: {
                      x: original.position.x + 50,
                      y: original.position.y + 50,
                    },
                  };
                  return [...nds, newNode];
                });
                setContextMenu(null);
              }}
            >
              Clone
            </div>
          </div>
        )}

        {/* Offcanvas */}
        <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="start" className='custom-offcanvas-width'>
          <Offcanvas.Header style={{ backgroundColor: '#E1E5EA', textAlign: 'center', justifyContent: 'center' }}>
            <Offcanvas.Title>
              {
                selectedNode?.type === "defaultNode" &&
                <p>default Node</p>
              }

              {
                selectedNode?.type === "textNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Text Message</h5>
              }

              {
                selectedNode?.type === "imageNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Image</h5>
              }

              {
                selectedNode?.type === "audioNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Audio</h5>
              }

              {
                selectedNode?.type === "videoNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Video</h5>
              }

              {
                selectedNode?.type === "fileNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure File</h5>
              }

              {
                selectedNode?.type === "locationNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Location Template</h5>
              }

              {
                selectedNode?.type === "whatsappFlowNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Whatsapp Flows</h5>
              }

              {
                selectedNode?.type === "interactiveNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Interactive</h5>
              }

              {
                selectedNode?.type === "conditionNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Condition</h5>
              }

              {
                selectedNode?.type === "newSequenceCampaignNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure New Sequence</h5>
              }

              {
                selectedNode?.type === "userInputFlowNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure User-Input-Flow</h5>
              }

              {
                selectedNode?.type === "aiReplyNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure AI Reply Message</h5>
              }

              {
                selectedNode?.type === "templateMessageNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Template Message</h5>
              }

              {
                selectedNode?.type === "ctaUrlButtonNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure CTA URL Button</h5>
              }

              {
                selectedNode?.type === "catalogNode" &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Catalog</h5>
              }

              {
                selectedNode?.type === 'sendMessageAfterNode' &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Sequence Message</h5>
              }

              {
                selectedNode?.type === 'quickReplyNode' &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Quick Reply</h5>
              }

              {
                selectedNode?.type === 'sectionNode' &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Section</h5>
              }

              {
                selectedNode?.type === 'rowNode' &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Row</h5>
              }

              {
                selectedNode?.type === 'productNode' &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Product</h5>
              }

              {
                selectedNode?.type === 'productSectionNode' &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Product Section</h5>
              }

              {
                selectedNode?.type === 'buttonNode' &&
                <h5 className='fw-bolder mb-0 py-1'>Configure Button</h5>
              }

              {
                selectedNode?.type === 'newQuestionNode' &&
                <h5 className='fw-bolder mb-0 py-1'>Configure New Question</h5>
              }
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {
              selectedNode?.type === "defaultNode" &&
              <div className="mt-2">
                <label htmlFor="delayRange" style={{ fontSize: '14px' }}>
                  Delay in reply - {seconds} sec
                </label>
                <input
                  type="range"
                  id="delayRange"
                  min="0"
                  max="60"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  className="form-range"
                />
              </div>
            }

            {
              selectedNode?.type === "textNode" &&
              <>
                <p>Please provide your reply message</p>
                <div style={{ minHeight: '100px' }}>
                  <textarea type='text' placeholder='Whatsapp text message limit is 4096 characters.' rows={5} className='configure-text-message w-100' />
                </div>
                <div className="mt-2">
                  <label htmlFor="delayRange" style={{ fontSize: '14px' }}>
                    Delay in reply - {seconds} sec
                  </label>
                  <input
                    type="range"
                    id="delayRange"
                    min="0"
                    max="60"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="form-range"
                  />
                </div>
              </>
            }

            {
              selectedNode?.type === "imageNode" && (
                <>
                  <div className='image-node-dummy-text'>
                    <h6 className='mb-0 fw-bold text-white'>Choose How to Send Media</h6>
                    <p className='mb-0'>You can deliver media to users in two ways:</p>
                    <hr style={{ margin: '10px 0px', color: '#fff', borderTop: '2px solid white' }} />
                    <h6 className='mb-0 fw-bold text-white'>Use Custom Field</h6>
                    <p className='mb-0'>Select this option if the file URL is already stored in a custom field. This is useful for dynamic or previously uploaded content.</p>
                    <hr style={{ margin: '10px 0px', color: '#fff', borderTop: '2px solid white' }} />
                    <h6 className='mb-0 fw-bold text-white'>Upload New Media</h6>
                    <p className='mb-0'>Upload a new file directly from your device. This media will be sent with the message immediately upon upload.</p>
                  </div>

                  {/* Upload Box */}
                  <div className="upload-box-wrapper mt-3 p-4 position-relative d-flex justify-content-center align-items-center">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleImageUpload}
                      style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, top: 0, left: 0, cursor: 'pointer' }}
                    />
                    <div className="" style={{ pointerEvents: 'none' }}>
                      <Image src={cloud} height={26} width={26} alt='cloud' />
                    </div>
                  </div>

                  <p className="text-center text-muted mt-1" style={{ fontSize: '12px' }}>
                    Supported types: png, jpg
                  </p>

                  {/* Preview */}
                  {imagePreview && (
                    <div className="text-center mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        height={100}
                        width={100}
                        style={{ borderRadius: '5px', border: '1px solid #ccc' }}
                      />
                    </div>
                  )}

                  <div className="mt-2">
                    <label htmlFor="delayRange" style={{ fontSize: '14px' }}>
                      Delay in reply - {seconds} sec
                    </label>
                    <input
                      type="range"
                      id="delayRange"
                      min="0"
                      max="60"
                      value={seconds}
                      onChange={(e) => setSeconds(e.target.value)}
                      className="form-range"
                    />
                  </div>
                </>
              )
            }

            {
              selectedNode?.type === "audioNode" &&
              <>
                <div className='image-node-dummy-text'>
                  <h6 className='mb-0 fw-bold text-white'>Choose How to Send Media</h6>
                  <p className='mb-0'>You can deliver media to users in two ways:</p>
                  <hr style={{ margin: '10px 0px', color: '#fff', borderTop: '2px solid white' }} />
                  <h6 className='mb-0 fw-bold text-white'>Use Custom Field</h6>
                  <p className='mb-0'>Select this option if the file URL is already stored in a custom field. This is useful for dynamic or previously uploaded content.</p>
                  <hr style={{ margin: '10px 0px', color: '#fff', borderTop: '2px solid white' }} />
                  <h6 className='mb-0 fw-bold text-white'>Upload New Media</h6>
                  <p className='mb-0'>Upload a new file directly from your device. This media will be sent with the message immediately upon upload.</p>
                </div>

                {/* Upload Box */}
                <div className="upload-box-wrapper mt-3 p-4 position-relative d-flex justify-content-center align-items-center">
                  <input
                    type="file"
                    onChange={handleAudioUpload}
                    accept=".mp3,audio/*"
                    style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, top: 0, left: 0, cursor: 'pointer' }}
                  />
                  <div className="" style={{ pointerEvents: 'none' }}>
                    <Image src={cloud} height={26} width={26} alt='cloud' />
                  </div>
                </div>

                {/* Show audio file name after upload */}
                {uploadedAudioFile && (
                  <p className="text-center mt-2 text-success" style={{ fontSize: '14px' }}>
                    Uploaded: <strong>{uploadedAudioFile.name}</strong>
                  </p>
                )}

                {/* Optional hint text */}
                <p className="text-center text-muted mt-1" style={{ fontSize: '12px' }}>
                  Supported types: mp3
                </p>

                <div className="mt-2">
                  <label htmlFor="delayRange" style={{ fontSize: '14px' }}>
                    Delay in reply - {seconds} sec
                  </label>
                  <input
                    type="range"
                    id="delayRange"
                    min="0"
                    max="60"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="form-range"
                  />
                </div>
              </>
            }

            {
              selectedNode?.type === "videoNode" &&
              <>
                <div className='image-node-dummy-text'>
                  <h6 className='mb-0 fw-bold text-white'>Choose How to Send Media</h6>
                  <p className='mb-0'>You can deliver media to users in two ways:</p>
                  <hr style={{ margin: '10px 0px', color: '#fff', borderTop: '2px solid white' }} />
                  <h6 className='mb-0 fw-bold text-white'>Use Custom Field</h6>
                  <p className='mb-0'>Select this option if the file URL is already stored in a custom field. This is useful for dynamic or previously uploaded content.</p>
                  <hr style={{ margin: '10px 0px', color: '#fff', borderTop: '2px solid white' }} />
                  <h6 className='mb-0 fw-bold text-white'>Upload New Media</h6>
                  <p className='mb-0'>Upload a new file directly from your device. This media will be sent with the message immediately upon upload.</p>
                </div>

                {/* Upload Box */}
                <div className="upload-box-wrapper mt-3 p-4 position-relative d-flex justify-content-center align-items-center">
                  <input
                    type="file"
                    onChange={handleVideoUpload}
                    accept="video/*"
                    style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, top: 0, left: 0, cursor: 'pointer' }}
                  />
                  <div className="" style={{ pointerEvents: 'none' }}>
                    <Image src={cloud} height={26} width={26} alt='cloud' />
                  </div>
                </div>

                {/* File name */}
                {uploadedVideo && (
                  <p className="text-center mt-2 text-success" style={{ fontSize: '14px' }}>
                    Uploaded: <strong>{uploadedVideo.name}</strong>
                  </p>
                )}

                {/* Video preview */}
                {previewURL && (
                  <div className="text-center mt-2">
                    <video width="320" height="240" controls>
                      <source src={previewURL} type={uploadedVideo.type} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {/* Supported file types note */}
                <p className="text-center text-muted mt-1" style={{ fontSize: '12px' }}>
                  Supported types: mp4, webm, ogg
                </p>

                <div className="mt-2">
                  <label htmlFor="delayRange" style={{ fontSize: '14px' }}>
                    Delay in reply - {seconds} sec
                  </label>
                  <input
                    type="range"
                    id="delayRange"
                    min="0"
                    max="60"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="form-range"
                  />
                </div>
              </>
            }

            {
              selectedNode?.type === "fileNode" &&
              <>
                <div className='image-node-dummy-text'>
                  <h6 className='mb-0 fw-bold text-white'>Choose How to Send Media</h6>
                  <p className='mb-0'>You can deliver media to users in two ways:</p>
                  <hr style={{ margin: '10px 0px', color: '#fff', borderTop: '2px solid white' }} />
                  <h6 className='mb-0 fw-bold text-white'>Use Custom Field</h6>
                  <p className='mb-0'>Select this option if the file URL is already stored in a custom field. This is useful for dynamic or previously uploaded content.</p>
                  <hr style={{ margin: '10px 0px', color: '#fff', borderTop: '2px solid white' }} />
                  <h6 className='mb-0 fw-bold text-white'>Upload New Media</h6>
                  <p className='mb-0'>Upload a new file directly from your device. This media will be sent with the message immediately upon upload.</p>
                </div>

                {/* Upload Box */}
                <div className="upload-box-wrapper mt-3 p-4 position-relative d-flex justify-content-center align-items-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                    onChange={handleFileUpload}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      top: 0,
                      left: 0,
                      cursor: 'pointer',
                    }}
                  />
                  <div style={{ pointerEvents: 'none' }}>
                    <Image src={file_upload} height={26} width={26} alt="file upload" />
                  </div>
                </div>

                {/* File name display */}
                {uploadedFile && (
                  <p className="text-center mt-2 text-success" style={{ fontSize: '14px' }}>
                    Uploaded: <strong>{uploadedFile.name}</strong>
                  </p>
                )}

                {/* Supported types message */}
                <p className="text-center text-muted mt-1" style={{ fontSize: '12px' }}>
                  Supported media types: doc, docx, pdf, txt, ppt, pptx, xls, xlsx
                </p>

                <div className="mt-2">
                  <label htmlFor="delayRange" style={{ fontSize: '14px' }}>
                    Delay in reply - {seconds} sec
                  </label>
                  <input
                    type="range"
                    id="delayRange"
                    min="0"
                    max="60"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="form-range"
                  />
                </div>
              </>
            }

            {
              selectedNode?.type === "locationNode" &&
              <>
                <p className='mb-1'><small>Please provide body text<span>*</span></small></p>
                <div style={{ minHeight: '100px' }}>
                  <textarea type='text' rows={5} className='configure-text-message w-100' />
                </div>
                <div className="mt-2">
                  <label htmlFor="delayRange" style={{ fontSize: '14px' }}>
                    Delay in reply - {seconds} sec
                  </label>
                  <input
                    type="range"
                    id="delayRange"
                    min="0"
                    max="60"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="form-range"
                  />
                </div>
              </>
            }

            {
              selectedNode?.type === "whatsappFlowNode" &&
              <>
                <div className='mb-2'>
                  <p className='mb-1'><small>Choose a flow</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select a Flow'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className='mb-2'>
                  <p className='mb-1'><small>Message Header<span>*</span></small></p>
                  <div>
                    <input type='text' className='whatsapp-text-message w-100' />
                  </div>
                </div>

                <div className='mb-2'>
                  <p className='mb-1'><small>Message Body<span>*</span></small></p>
                  <div style={{ minHeight: '100px' }}>
                    <textarea type='text' rows={5} className='configure-text-message w-100' />
                  </div>
                </div>

                <div className='mb-2'>
                  <p className='mb-1'><small>Message Footer</small></p>
                  <div>
                    <input type='text' className='whatsapp-text-message w-100' />
                  </div>
                </div>

                <div className='mb-2'>
                  <p className='mb-1'><small>Footer Button Text<span>*</span></small></p>
                  <div>
                    <input type='text' className='whatsapp-text-message w-100' />
                  </div>
                </div>

                <div>
                  <label htmlFor="delayRange" style={{ fontSize: '14px' }}>
                    Delay in reply - {seconds} sec
                  </label>
                  <input
                    type="range"
                    id="delayRange"
                    min="0"
                    max="60"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="form-range"
                  />
                </div>
              </>
            }

            {
              selectedNode?.type === "interactiveNode" &&
              <>
                <div className='mb-2'>
                  <p className='mb-1'><small>Message Header (Optional)</small></p>
                  <div className='d-flex gap-2 align-items-center'>
                    <div
                      className={`select-message-header d-flex justify-content-center align-items-center ${selectedType === 'keyboard' ? 'selected' : ''
                        }`}
                      onClick={() => handleSelect('keyboard')}>
                      <FaKeyboard />
                    </div>

                    <div
                      className={`select-message-header d-flex justify-content-center align-items-center ${selectedType === 'upload' ? 'selected' : ''
                        }`}
                      onClick={() => handleSelect('upload')}>
                      <FaUpload />
                    </div>
                  </div>
                </div>

                {
                  selectedType === 'keyboard' ? (
                    <div className='mb-2'>
                      <p className='mb-1'><small>Text</small></p>
                      <div>
                        <input type='text' placeholder='Provide text for header' className='whatsapp-text-message w-100' />
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Upload Box */}
                      <p className='mb-1'><small>Media Upload</small></p>
                      <div className="upload-box-wrapper p-4 position-relative d-flex justify-content-center align-items-center">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.mp4,.webm,.ogg,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                          onChange={handleMediaUpload}
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            top: 0,
                            left: 0,
                            cursor: 'pointer',
                          }}
                        />
                        <div style={{ pointerEvents: 'none' }}>
                          <Image src={cloud} height={26} width={26} alt="cloud" />
                        </div>
                      </div>

                      {/* Info and Error */}
                      <p className="text-center text-muted mt-1" style={{ fontSize: '12px' }}>
                        Supported: Image (5MB), Video (16MB), File (100MB)
                      </p>
                      {error && (
                        <p className="text-danger text-center" style={{ fontSize: '13px' }}>
                          {error}
                        </p>
                      )}

                      {/* Preview */}
                      {uploadedType === 'image' && mediaPreview && (
                        <div className="text-center mt-3">
                          <img
                            src={mediaPreview}
                            alt="Preview"
                            height={100}
                            width={100}
                            style={{ borderRadius: '5px', border: '1px solid #ccc' }}
                          />
                        </div>
                      )}

                      {uploadedType === 'video' && mediaPreview && (
                        <div className="text-center mt-3">
                          <video width="320" height="240" controls>
                            <source src={mediaPreview} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}

                      {uploadedType === 'file' && mediaPreview && (
                        <div className="text-center mt-3">
                          <p className="text-success">Document uploaded successfully ✅</p>
                        </div>
                      )}
                    </>
                  )
                }

                <div className='mb-2'>
                  <p className='mb-1'><small>Message Body</small></p>
                  <div style={{ minHeight: '100px' }}>
                    <textarea type='text' rows={5} className='configure-text-message w-100' />
                  </div>
                </div>

                <div className='mb-2'>
                  <p className='mb-1'><small>Message Footer (Optional)</small></p>
                  <div>
                    <input type='text' className='whatsapp-text-message w-100' placeholder='Provide text for footer' />
                  </div>
                </div>

                <div>
                  <label htmlFor="delayRange" style={{ fontSize: '14px' }}>
                    Delay in reply - {seconds} sec
                  </label>
                  <input
                    type="range"
                    id="delayRange"
                    min="0"
                    max="60"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="form-range"
                  />
                </div>
              </>
            }

            {
              selectedNode?.type === "conditionNode" &&
              <>
                <div>
                  <Form>
                    <div className='row mt-3'>
                      <div className='col-md-4'>
                        <Form.Label style={{ fontSize: '13px', marginBottom: '0px' }}>All Match</Form.Label>
                        <Form.Check
                          type="switch"
                          id="schedule-within-24"
                          checked={allMatch}
                          onChange={(e) => {
                            setAllMatch(e.target.checked);
                            if (e.target.checked) setAnyMatch(false);
                          }}
                          className="fs-6"
                        />
                      </div>

                      <div className='col-md-4'>
                        <Form.Label style={{ fontSize: '13px', marginBottom: '0px' }}>Any Match</Form.Label>
                        <Form.Check
                          type="switch"
                          id="schedule-daily-sequence"
                          checked={anyMatch}
                          onChange={(e) => {
                            setAnyMatch(e.target.checked);
                            if (e.target.checked) setAllMatch(false);
                          }}
                          className="fs-6"
                        />
                      </div>
                    </div>

                    <div className='mt-5'>
                      <p className='mb-1' style={{ fontSize: '17px' }}><small>System Field <span><i className="fa-solid fa-circle-plus me-2 add-more-btn-icon" style={{ color: '#0d8bf1', fontSize: '13px' }}></i></span></small></p>
                      <div className='row'>
                        <div className='col-md-4'>
                          <div className=''>
                            <p className='mb-1'><small>Variable</small></p>
                            <div>
                              <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                placeholder='Select'
                                className='custom-react-select'
                              />
                            </div>
                          </div>
                        </div>

                        <div className='col-md-4'>
                          <div className=''>
                            <p className='mb-1'><small>Operator</small></p>
                            <div>
                              <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                placeholder='Select'
                                className='custom-react-select'
                              />
                            </div>
                          </div>
                        </div>

                        <div className='col-md-4'>
                          <div className=''>
                            <p className='mb-1'><small>Gender</small></p>
                            <div>
                              <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                placeholder='Select'
                                className='custom-react-select'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='mt-5'>
                      <p className='mb-1' style={{ fontSize: '17px' }}><small>Custom Field <span><i className="fa-solid fa-circle-plus me-2 add-more-btn-icon" style={{ color: '#0d8bf1', fontSize: '13px' }}></i></span></small></p>
                      <div className='row'>
                        <div className='col-md-4'>
                          <div className=''>
                            <p className='mb-1'><small>Variable</small></p>
                            <div>
                              <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                placeholder='Select'
                                className='custom-react-select'
                              />
                            </div>
                          </div>
                        </div>

                        <div className='col-md-4'>
                          <div className=''>
                            <p className='mb-1'><small>Operator</small></p>
                            <div>
                              <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                placeholder='Select'
                                className='custom-react-select'
                              />
                            </div>
                          </div>
                        </div>

                        <div className='col-md-4'>
                          <div className=''>
                            <p className='mb-1'><small>Value</small></p>
                            <div>
                              <input type='text' className='whatsapp-text-message w-100' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </>
            }

            {
              selectedNode?.type === "newSequenceCampaignNode" &&
              <>
                <div className="info-box">
                  Effortlessly engage your audience with a Sequence Message Campaign. Set up a series of messages to be delivered at specific time intervals, ensuring timely and relevant communication. Whether it’s delivering valuable content, nurturing leads, or guiding users through a process, this campaign type lets you create a seamless and automated journey that keeps your audience informed and engaged.
                </div>

                <div className='mt-2'>
                  <p className='mb-1'><small>Sequence Campaign Name</small></p>
                  <div>
                    <input type='text' className='whatsapp-text-message w-100' />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Preferred delivery time for messages scheduled outside the 24-hour window</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select a Flow'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Time Zone</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select a Flow'
                      className='custom-react-select'
                    />
                  </div>
                </div>
              </>
            }

            {
              selectedNode?.type === "userInputFlowNode" &&
              <>
                <div className="info-box">
                  Name your User Input Campaign to reflect its purpose, whether it's for surveys, order collection, reservations, appointments, or other interactive processes. This campaign type enables you to create a sequence of questions, with the collected data saved as a consolidated set. You can easily export this combined data to a CSV file for analysis and management. Choose a name that defines the essence of your campaign and aids in efficient organization of the gathered insights.
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>User input flow</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select a Flow'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Send data to Webhook URL</small></p>
                  <div>
                    <input type='text' className='whatsapp-text-message w-100' />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Send data to Google Sheets</small></p>
                  <div>
                    <input type='text' className='whatsapp-text-message w-100' />
                  </div>
                </div>
              </>
            }

            {
              selectedNode?.type === "aiReplyNode" &&
              <>
                <p className='mb-0'><small>Please write a message to learn AI.</small></p>
                <div style={{ minHeight: '100px' }}>
                  <textarea type='text' rows={5} className='configure-text-message w-100' />
                </div>

                <div className="mt-2">
                  <label htmlFor="delayRange" style={{ fontSize: '14px' }}>
                    Delay in reply - {seconds} sec
                  </label>
                  <input
                    type="range"
                    id="delayRange"
                    min="0"
                    max="60"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="form-range"
                  />
                </div>
              </>
            }

            {
              selectedNode?.type === "templateMessageNode" &&
              <>
                <div className=''>
                  <p className='mb-1'><small>Select template</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select a Flow'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="delayRange" style={{ fontSize: '14px' }}>
                    Delay in reply - {seconds} sec
                  </label>
                  <input
                    type="range"
                    id="delayRange"
                    min="0"
                    max="60"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="form-range"
                  />
                </div>
              </>
            }

            {
              selectedNode?.type === "ctaUrlButtonNode" &&
              <>
                <div>
                  <p className='mb-0'><small>Header Message</small></p>
                  <div style={{ minHeight: '100px' }}>
                    <textarea type='text' rows={5} className='configure-text-message w-100' />
                  </div>
                </div>

                <div>
                  <p className='mb-0'><small>Body Message</small></p>
                  <div style={{ minHeight: '100px' }}>
                    <textarea type='text' rows={5} className='configure-text-message w-100' />
                  </div>
                </div>

                <div>
                  <p className='mb-0'><small>Footer Message</small></p>
                  <div style={{ minHeight: '100px' }}>
                    <textarea type='text' rows={5} className='configure-text-message w-100' />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Button Text</small></p>
                  <div>
                    <input type='text' className='whatsapp-text-message w-100' />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Button URL</small></p>
                  <div>
                    <input type='text' className='whatsapp-text-message w-100' />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="delayRange" style={{ fontSize: '14px' }}>
                    Delay in reply - {seconds} sec
                  </label>
                  <input
                    type="range"
                    id="delayRange"
                    min="0"
                    max="60"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="form-range"
                  />
                </div>
              </>
            }

            {
              selectedNode?.type === "catalogNode" &&
              <>
                <p className='mb-1'><small>Catalog ID</small></p>
                <div>
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder='Select a Catalog'
                    className='custom-react-select'
                  />
                </div>
              </>
            }

            {
              selectedNode?.type === 'sendMessageAfterNode' &&
              <>
                <div className="info-box">
                  Optimize engagement through personalized messaging. Craft content, timing, and audience per message for effectiveness.Customize sequences for campaign goals and choose preferred scheduling.
                </div>

                <div className="option-box mt-3">
                  Option 1 - Immediate Impact (Inside 24-Hour Window) : Send messages within 24 hours for higher visibility.
                </div>

                <div className="option-box mt-3">
                  Option 2 - Consistent Outreach (Daily Sequence) : Plan messages outside 24 hours for ongoing communication.
                </div>

                <div>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="schedule-within-24"
                      label="Schedule Message within 24-Hour Window"
                      checked={within24Hours}
                      onChange={(e) => setWithin24Hours(e.target.checked)}
                      className='mt-3 fs-6'
                    />

                    <Form.Check
                      type="switch"
                      id="schedule-daily-sequence"
                      label="Schedule Message for Daily Sequence (Outside 24-Hour Window)"
                      checked={outside24Hours}
                      onChange={(e) => setOutside24Hours(e.target.checked)}
                      className='mt-3 fs-6'
                    />
                  </Form>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Schedule Message After</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select'
                      className='custom-react-select'
                    />
                  </div>
                </div>
              </>
            }

            {
              selectedNode?.type === 'quickReplyNode' &&
              <>
                <p>Button Name</p>
                <div>
                  <input type='text' className='whatsapp-text-message w-100' />
                </div>
              </>
            }

            {
              selectedNode?.type === 'sectionNode' &&
              <>
                <p>Title</p>
                <div>
                  <input type='text' className='whatsapp-text-message w-100' />
                </div>
              </>
            }

            {
              selectedNode?.type === 'rowNode' &&
              <>
                <div className='mb-2'>
                  <p className='mb-1'><small>Row Generation Method</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select a Flow'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-0'>Title</p>
                  <div>
                    <input type='text' className='whatsapp-text-message w-100' />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-0'>Description</p>
                  <div style={{ minHeight: '100px' }}>
                    <textarea type='text' rows={5} className='configure-text-message w-100' />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Save Selection to Custom Field</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Add Label(s)</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Remove Label(s)</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Subscribe to Sequence</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select a Sequence'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Unsubscribe from Sequence</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select a Sequence'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Assign Conversation to a group</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select Team Role'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Assign conversation to a user</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select Team Member'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-0'>Send data to Webhook URL</p>
                  <div>
                    <input type='text' className='whatsapp-text-message w-100' />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>Send data to Google Sheets</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      className='custom-react-select'
                    />
                  </div>
                </div>
              </>
            }

            {
              selectedNode?.type === 'productNode' &&
              <>
                <div className='mt-3'>
                  <p className='mb-1'><small>Product ID</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select Product'
                      className='custom-react-select'
                    />
                  </div>
                </div>
              </>
            }

            {
              selectedNode?.type === 'productSectionNode' &&
              <>
                <div className='mt-3'>
                  <p className='mb-1'><small>Title</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      className='custom-react-select'
                    />
                  </div>
                </div>
              </>
            }

            {
              selectedNode?.type === 'buttonNode' &&
              <>
                <div className=''>
                  <p className='mb-1'><small>Button Generation Method</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select a Flow'
                      className='custom-react-select'
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-0'>Button Name</p>
                  <div>
                    <input type='text' className='whatsapp-text-message w-100' />
                  </div>
                </div>

                <div className='mt-3'>
                  <p className='mb-1'><small>When user press the button</small></p>
                  <div>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder='Select a Flow'
                      className='custom-react-select'
                    />
                  </div>
                </div>
              </>
            }

            {
              selectedNode?.type === 'newQuestionNode' &&
              <>
                <div>
                  <p className='mb-1'><small>Choose question type</small></p>
                  <Form>
                    <Form.Check
                      type="switch"
                      id="schedule-within-24"
                      label="Free Keyboard Input"
                      checked={freeKeyboardInput}
                      onChange={(e) => {
                        setFreeKeyboardInput(e.target.checked);
                        if (e.target.checked) setMultipleChoice(false);
                      }}
                      className="mt-3 fs-6"
                    />

                    <Form.Check
                      type="switch"
                      id="schedule-daily-sequence"
                      label="Multiple Choice"
                      checked={multipleChoice}
                      onChange={(e) => {
                        setMultipleChoice(e.target.checked);
                        if (e.target.checked) setFreeKeyboardInput(false);
                      }}
                      className="fs-6"
                    />
                  </Form>
                </div>

                {/* <p className='mb-1 mt-4'><small>Question</small></p>
                <div style={{ minHeight: '100px' }}>
                  <textarea type='text' rows={5} className='configure-text-message w-100' placeholder='Put your question here' />
                </div> */}

                {
                  freeKeyboardInput &&
                  <>
                    <div className=''>
                      <p className='mb-1'><small>Reply type</small></p>
                      <div>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder='Select a Flow'
                          className='custom-react-select'
                        />
                      </div>
                    </div>

                    <div className='mt-3'>
                      <p className='mb-1'><small>Save to custom field</small></p>
                      <div>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder='Select a Flow'
                          className='custom-react-select'
                        />
                      </div>
                    </div>

                    <div className='mt-3'>
                      <p className='mb-1'><small>Save to system field</small></p>
                      <div>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder='Please Select'
                          className='custom-react-select'
                        />
                      </div>
                    </div>
                  </>
                }

                {
                  multipleChoice &&
                  <>
                    <div className=''>
                      <p className='mb-1'><small>Reply type</small></p>
                      <div>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder='Select a Flow'
                          className='custom-react-select'
                        />
                      </div>
                    </div>

                    <div className='mt-3'>
                      <p className='mb-1 mt-4'><small>Multiple Choice option button label (20)</small></p>
                      <div>
                        <input type='text' className='whatsapp-text-message w-100' />
                      </div>
                    </div>

                    <div className='row mt-3'>
                      <div className='col-md-6'>
                        <input type='text' className='whatsapp-text-message w-100' placeholder='Option 1' />
                      </div>
                      <div className='col-md-6'>
                        <input type='text' className='whatsapp-text-message w-100' placeholder='Option 2' />
                      </div>
                    </div>

                    <div className='text-center my-4'>
                      <button className='add-more-btn'><span><i className="fa-solid fa-circle-plus me-2 add-more-btn-icon" style={{ color: '#0d8bf1' }}></i></span>Add More</button>
                    </div>

                    <div>
                      <p className='mb-1'><small>Reply type</small></p>
                      <div>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder='Text'
                          className='custom-react-select'
                        />
                      </div>
                    </div>

                    <div className='mt-3'>
                      <p className='mb-1'><small>Save to custom field</small></p>
                      <div>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder='Please Select'
                          className='custom-react-select'
                        />
                      </div>
                    </div>

                    <div className='mt-3'>
                      <p className='mb-1'><small>Save to system field</small></p>
                      <div>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder='Please Select'
                          className='custom-react-select'
                        />
                      </div>
                    </div>

                    <div className='mt-3'>
                      <p className='mb-1'><small>Skip button text</small></p>
                      <input type='text' className='whatsapp-text-message w-100' placeholder='Put your skip button text here' />
                    </div>
                  </>
                }
              </>
            }

            <hr style={{ margin: '50px 0px 20px 0px', borderTop: '1px dashed black' }} />

            <div className='d-flex justify-content-between'>
              <button className='save-btn'>
                <Image src={save} height={15} width={15} alt='save' className='me-1' />Save
              </button>

              <button className='close-btn' onClick={() => setShowOffcanvas(false)}>
                {/* <Image src={cancel} height={15} width={15} alt='cancel' className='me-1' />Close */}
                <i className="fa-solid fa-circle-xmark"></i> Close
              </button>
            </div>

          </Offcanvas.Body>
        </Offcanvas>
      </ReactFlowProvider>
    </div>
  );
}
