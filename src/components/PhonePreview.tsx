import styled, { keyframes, css } from 'styled-components'
import { format } from 'date-fns'
import { Message, Contact } from '../types'
import { useEffect, useRef, useState } from 'react'

// Inline SVG icon components for realistic WhatsApp icons
const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <path d="M12 4l1.41 1.41L7.83 11H20v2H7.83l5.58 5.59L12 20l-8-8 8-8z" fill="white"/>
  </svg>
)

const VideoCallIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="white"/>
  </svg>
)

const PhoneCallIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" fill="white"/>
  </svg>
)

const MoreOptionsIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <circle cx="12" cy="5" r="2" fill="white"/>
    <circle cx="12" cy="12" r="2" fill="white"/>
    <circle cx="12" cy="19" r="2" fill="white"/>
  </svg>
)

const EmojiIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#8696a0" strokeWidth="1.5" fill="none"/>
    <circle cx="9" cy="10" r="1.2" fill="#8696a0"/>
    <circle cx="15" cy="10" r="1.2" fill="#8696a0"/>
    <path d="M8.5 14.5c0 0 1.5 2.5 3.5 2.5s3.5-2.5 3.5-2.5" stroke="#8696a0" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
  </svg>
)

const AttachIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <path d="M19.187 3.588a2.75 2.75 0 00-3.889 0L5.575 13.31a4.5 4.5 0 006.364 6.364l8.397-8.398a.75.75 0 011.06 1.06l-8.396 8.398a6 6 0 01-8.486-8.486L14.237 2.527a4.25 4.25 0 016.01 6.01L10.524 18.26a2.5 2.5 0 01-3.535-3.535l7.07-7.071a.75.75 0 011.062 1.06l-7.071 7.072a1 1 0 001.414 1.414L19.187 7.476a2.75 2.75 0 000-3.888z" fill="#8696a0"/>
  </svg>
)

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <path d="M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4z" fill="#8696a0"/>
    <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="#8696a0"/>
  </svg>
)

const MicIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="white"/>
    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="white"/>
  </svg>
)

// Checkmark SVG components
const SingleCheck = ({ color = '#8696a0' }: { color?: string }) => (
  <svg viewBox="0 0 16 11" width="16" height="11">
    <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.327-.14.52.52 0 0 0-.326.14l-.445.468a.516.516 0 0 0 0 .697l2.89 3.018a.478.478 0 0 0 .327.14.536.536 0 0 0 .41-.195l7.01-8.638a.456.456 0 0 0 .073-.337.473.473 0 0 0-.186-.305z" fill={color}/>
  </svg>
)

const DoubleCheck = ({ color = '#8696a0' }: { color?: string }) => (
  <svg viewBox="0 0 16 11" width="16" height="11">
    <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.327-.14.52.52 0 0 0-.326.14l-.445.468a.516.516 0 0 0 0 .697l2.89 3.018a.478.478 0 0 0 .327.14.536.536 0 0 0 .41-.195l7.01-8.638a.456.456 0 0 0 .073-.337.473.473 0 0 0-.186-.305z" fill={color}/>
    <path d="M15.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.2-1.25-.38.44 1.58 1.651a.478.478 0 0 0 .327.14.536.536 0 0 0 .41-.195l7.01-8.638a.456.456 0 0 0 .073-.337.473.473 0 0 0-.186-.305z" fill={color}/>
  </svg>
)

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const PhoneFrame = styled.div`
  width: 360px;
  height: 740px;
  background-color: #000;
  border-radius: 40px;
  padding: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  transform-origin: center center;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 360px;
    height: calc(100vh - 40px);
    max-height: 740px;
    margin: 20px auto;
    border-radius: 20px;
    transform: scale(0.95);
  }

  @media (min-width: 769px) and (max-height: 800px) {
    transform: scale(0.85);
    margin: -40px auto;
  }

  @media (min-width: 769px) and (min-height: 801px) and (max-height: 900px) {
    transform: scale(0.9);
    margin: -20px auto;
  }

  @media (min-width: 769px) and (min-height: 901px) {
    transform: scale(1);
    margin: 0 auto;
  }
`

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 34px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    border-radius: 16px;
  }

  @media (min-width: 769px) and (max-height: 800px) {
    border-radius: 30px;
  }
`

// Android status bar
const StatusBar = styled.div`
  background-color: #054d44;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  height: 24px;
  font-size: 12px;
  font-weight: 400;
  font-family: 'Roboto', 'Segoe UI', sans-serif;
`

const StatusBarTime = styled.span`
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
`

const StatusBarIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const ChatHeader = styled.div`
  background-color: var(--whatsapp-header);
  color: white;
  padding: 6px 6px 6px 0;
  display: flex;
  align-items: center;
  height: 56px;

  @media (max-width: 768px) {
    height: 52px;
    padding: 6px 6px 6px 0;
  }
`

const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`

const ContactInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const ContactName = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ContactStatus = styled.div`
  font-size: 13px;
  opacity: 0.85;
  line-height: 1.2;
`

const HeaderIcons = styled.div`
  display: flex;
  gap: 2px;
  margin-left: 4px;

  & > div {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`

const ChatBody = styled.div`
  flex: 1;
  background-color: #efeae2;
  padding: 6px 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-image: url('/Whatsapp-chat-backgroung.png');
  background-size: cover;
  background-position: center;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
  }
`

const TimestampDivider = styled.div`
  align-self: center;
  background-color: #d9f2fa;
  color: #54656f;
  font-size: 12px;
  padding: 5px 12px 6px;
  border-radius: 7px;
  margin: 8px 0;
  box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.13);
  font-weight: 500;
  letter-spacing: -0.1px;
`

// Message bubble tail using SVG clip-path approach
const MessageBubble = styled.div<{ sender: 'me' | 'them', isNew?: boolean, isBusinessMessage?: boolean, isClickable?: boolean }>`
  max-width: 75%;
  padding: 6px 7px 8px 9px;
  position: relative;
  word-wrap: break-word;
  align-self: ${props => props.sender === 'me' ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.sender === 'me' ? '#d9fdd3' : '#ffffff'};
  box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.13);

  border-radius: ${props => props.sender === 'me'
    ? '7.5px 7.5px 0 7.5px'
    : '7.5px 7.5px 7.5px 0'
  };

  margin-top: 2px;
  margin-bottom: 1px;
  ${props => props.sender === 'me' ? 'margin-right: 8px;' : 'margin-left: 8px;'}

  ${props => props.isNew && css`
    animation: ${fadeIn} 0.3s ease-out;
  `}

  @media (max-width: 768px) {
    max-width: 85%;
    padding: 6px 7px 8px 9px;
  }

  /* Bubble tail using SVG background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 8px;
    height: 13px;
    ${props => props.sender === 'me'
      ? `
        right: -8px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 13'%3E%3Cpath d='M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z' fill='%23d9fdd3'/%3E%3C/svg%3E") no-repeat;
      `
      : `
        left: -8px;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 13'%3E%3Cpath d='M1.533 1.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z' fill='%23ffffff'/%3E%3C/svg%3E") no-repeat;
      `
    }
    background-size: contain;
  }

  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  &:hover {
    ${props => props.isClickable && `
      background-color: ${props.sender === 'me' ? '#c8e6c9' : '#f5f5f5'};
    `}
  }
`

const ImageMessageBubble = styled(MessageBubble)`
  padding: 3px;

  img {
    width: 100%;
    max-width: 300px;
    border-radius: 6px;
    display: block;
  }
`

const MessageText = styled.div`
  font-size: 14.2px;
  margin-bottom: 0;
  line-height: 19px;
  white-space: pre-wrap;
  color: #111b21;

  b, strong {
    font-weight: 600;
  }
`

const ImageCaption = styled(MessageText)`
  padding: 6px 4px 2px 4px;
  color: var(--text-primary);
`

const MessageMeta = styled.div<{ sender?: 'me' | 'them' }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3px;
  margin-top: -2px;
  float: right;
  margin-left: 8px;
  position: relative;
  top: 5px;
`

const MessageTime = styled.span<{ sender?: 'me' | 'them' }>`
  font-size: 11px;
  color: ${props => props.sender === 'me' ? '#667781' : '#667781'};
  line-height: 15px;
`

const MessageStatusIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 1px;

  svg {
    display: block;
  }
`

const ChatFooter = styled.div`
  background-color: #f0f2f5;
  padding: 4px 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 50px;

  @media (max-width: 768px) {
    padding: 4px 6px;
    gap: 4px;
  }
`

const FooterIconButton = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 50%;

  svg {
    width: 24px;
    height: 24px;
  }
`

const InputWrapper = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 21px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
`

const InputEmojiButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`

const InputText = styled.div`
  flex: 1;
  font-size: 15px;
  color: #667781;
  line-height: 20px;

  &::before {
    content: 'Message';
    opacity: 0.65;
  }
`

const InputRightIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  svg {
    width: 22px;
    height: 22px;
    cursor: pointer;
  }
`

const MicButtonCircle = styled.div`
  width: 46px;
  height: 46px;
  background-color: #00a884;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`

// Business message components
const BusinessButton = styled.div`
  width: 100%;
  padding: 10px 16px;
  margin: 2px 0;
  background-color: white;
  border-radius: 7.5px;
  text-align: center;
  color: #00a884;
  font-weight: 500;
  font-size: 14px;
  box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.13);
  cursor: pointer;
  transition: background-color 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #f5f5f5;
  }
  &:active {
    background-color: #e9e9e9;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`

const UrlIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 6px;

  img {
    width: 18px;
    height: 18px;
  }
`

const BusinessMessageContainer = styled.div<{ sender?: 'me' | 'them' | null }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 75%;
  align-self: ${props => props.sender === 'me' ? 'flex-end' : 'flex-start'};
  margin-bottom: 4px;
  ${props => props.sender === 'me' ? 'margin-right: 8px;' : 'margin-left: 8px;'}

  @media (max-width: 768px) {
    max-width: 85%;
  }
`

const WebViewContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 10;
  display: ${props => props.isVisible ? 'flex' : 'none'};
  flex-direction: column;
  border-radius: 34px;
  overflow: hidden;

  @media (max-width: 768px) {
    border-radius: 0;
  }
`

const WebViewHeader = styled.div`
  background-color: var(--whatsapp-header);
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 56px;

  @media (max-width: 768px) {
    height: 52px;
    padding: 8px 16px;
  }
`

const WebViewTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 10px;
`

const WebViewIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`

interface PhonePreviewProps {
  contact: Contact;
  messages: Message[];
  onUpdateMessage: (id: string, updates: Partial<Message>) => void;
}

// Status indicator icons for the status bar
const StatusBarContent = () => (
  <StatusBar>
    <StatusBarTime>12:30</StatusBarTime>
    <StatusBarIcons>
      {/* Signal strength */}
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
        <rect x="0" y="10" width="3" height="4" rx="0.5" fill="white"/>
        <rect x="4.5" y="7" width="3" height="7" rx="0.5" fill="white"/>
        <rect x="9" y="3.5" width="3" height="10.5" rx="0.5" fill="white"/>
        <rect x="13.5" y="0" width="2.5" height="14" rx="0.5" fill="white" opacity="0.4"/>
      </svg>
      {/* WiFi */}
      <svg width="16" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" fill="white"/>
      </svg>
      {/* Battery */}
      <svg width="22" height="12" viewBox="0 0 25 12" fill="none">
        <rect x="0.5" y="0.5" width="21" height="11" rx="2" stroke="white" strokeWidth="1"/>
        <rect x="22" y="3.5" width="2.5" height="5" rx="1" fill="white" opacity="0.5"/>
        <rect x="2" y="2" width="18" height="8" rx="1" fill="white"/>
      </svg>
    </StatusBarIcons>
  </StatusBar>
)

// Render message status checkmarks
const MessageStatusCheckmark = ({ status }: { status: string }) => {
  if (status === 'read') {
    return (
      <MessageStatusIcon>
        <DoubleCheck color="#53bdeb" />
      </MessageStatusIcon>
    )
  }
  if (status === 'delivered') {
    return (
      <MessageStatusIcon>
        <DoubleCheck color="#8696a0" />
      </MessageStatusIcon>
    )
  }
  return (
    <MessageStatusIcon>
      <SingleCheck color="#8696a0" />
    </MessageStatusIcon>
  )
}

const PhonePreview = ({ contact, messages }: PhonePreviewProps) => {
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);
  const [webViewTitle, setWebViewTitle] = useState<string>('');

  const handleOpenLink = (url: string, title: string = 'Web View', openInNewTab: boolean = false) => {
    if (openInNewTab || !url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setWebViewUrl(url);
      setWebViewTitle(title);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCloseWebView = () => {
    setWebViewUrl(null);
  };

  const formatMessageTime = (date: Date) => {
    return format(date, 'HH:mm');
  };

  const getStatusDisplay = () => {
    if (contact.status === 'online') {
      return 'online';
    } else if (contact.status === 'typing') {
      return 'typing...';
    } else {
      return `last seen ${format(contact.lastSeen, 'HH:mm')}`;
    }
  };

  // Group messages for business message display
  const renderMessages = () => {
    const result = [];
    let currentBusinessGroup: Message[] = [];
    let businessGroupSender: 'me' | 'them' | null = null;

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const isNew = i === messages.length - 1;

      if (message.type === 'button' && message.isBusinessMessage && businessGroupSender === message.sender) {
        currentBusinessGroup.push(message);
        continue;
      }

      if (currentBusinessGroup.length > 0 && (message.sender !== businessGroupSender || !message.isBusinessMessage || message.type !== 'button')) {
        result.push(
          <BusinessMessageContainer key={`business-group-${currentBusinessGroup[0].id}`} sender={businessGroupSender}>
            {currentBusinessGroup.map((buttonMsg) => (
              <BusinessButton
                key={buttonMsg.id}
                onClick={() => {
                  if (buttonMsg.link) {
                    handleOpenLink(
                      buttonMsg.link,
                      buttonMsg.buttonText || buttonMsg.text,
                      buttonMsg.openLinkInWebView === false
                    );
                  }
                }}
              >
                {buttonMsg.buttonText || buttonMsg.text}
                {buttonMsg.link && <UrlIconWrapper><img src="/url icon.svg" alt="Link" /></UrlIconWrapper>}
              </BusinessButton>
            ))}
          </BusinessMessageContainer>
        );

        currentBusinessGroup = [];
        businessGroupSender = null;
      }

      if (message.type === 'button' && message.isBusinessMessage) {
        businessGroupSender = message.sender;
        currentBusinessGroup.push(message);
      } else if (message.type === 'button') {
        result.push(
          <BusinessMessageContainer key={`button-${message.id}`} sender={message.sender}>
            <BusinessButton
              key={message.id}
              onClick={() => {
                if (message.link) {
                  handleOpenLink(
                    message.link,
                    message.buttonText || message.text,
                    message.openLinkInWebView === false
                  );
                }
              }}
            >
              {message.buttonText || message.text}
              {message.link && <UrlIconWrapper><img src="/url icon.svg" alt="Link" /></UrlIconWrapper>}
            </BusinessButton>
          </BusinessMessageContainer>
        );
      } else {
        const containsFormatting = message.text.includes('*');

        const messageContent = (
          <>
            {message.type === 'image' ? (
              <>
                <img src={message.imageUrl} alt={message.caption || 'Image message'} />
                {message.caption && (
                  <ImageCaption>{message.caption}</ImageCaption>
                )}
              </>
            ) : (
              <MessageText>
                {containsFormatting ? (
                  <span dangerouslySetInnerHTML={{
                    __html: message.text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
                  }} />
                ) : message.text}
              </MessageText>
            )}
            <MessageMeta sender={message.sender}>
              <MessageTime sender={message.sender}>{formatMessageTime(message.timestamp)}</MessageTime>
              {message.sender === 'me' && (
                <MessageStatusCheckmark status={message.status} />
              )}
            </MessageMeta>
          </>
        );

        result.push(
          message.type === 'image' ? (
            <ImageMessageBubble
              key={message.id}
              sender={message.sender}
              isNew={isNew}
              isBusinessMessage={message.isBusinessMessage}
            >
              {messageContent}
            </ImageMessageBubble>
          ) : (
            <MessageBubble
              key={message.id}
              sender={message.sender}
              isNew={isNew}
              isBusinessMessage={message.isBusinessMessage}
              isClickable={!!message.link}
              onClick={() => {
                if (message.link) {
                  handleOpenLink(
                    message.link,
                    'Web View',
                    message.openLinkInWebView === false
                  );
                }
              }}
            >
              {messageContent}
            </MessageBubble>
          )
        );
      }
    }

    if (currentBusinessGroup.length > 0) {
      result.push(
        <BusinessMessageContainer key={`business-group-${currentBusinessGroup[0].id}`} sender={businessGroupSender}>
          {currentBusinessGroup.map((buttonMsg) => (
            <BusinessButton
              key={buttonMsg.id}
              onClick={() => {
                if (buttonMsg.link) {
                  handleOpenLink(
                    buttonMsg.link,
                    buttonMsg.buttonText || buttonMsg.text,
                    buttonMsg.openLinkInWebView === false
                  );
                }
              }}
            >
              {buttonMsg.buttonText || buttonMsg.text}
              {buttonMsg.link && <UrlIconWrapper><img src="/url icon.svg" alt="Link" /></UrlIconWrapper>}
            </BusinessButton>
          ))}
        </BusinessMessageContainer>
      );
    }

    return result;
  };

  return (
    <PhoneFrame>
      <PhoneScreen>
        <StatusBarContent />
        <ChatHeader>
          <BackButton>
            <BackArrowIcon />
          </BackButton>
          <Avatar src={contact.avatar} alt={contact.name} />
          <ContactInfo>
            <ContactName>{contact.name}</ContactName>
            <ContactStatus>{getStatusDisplay()}</ContactStatus>
          </ContactInfo>
          <HeaderIcons>
            <div>
              <VideoCallIcon />
            </div>
            <div>
              <PhoneCallIcon />
            </div>
            <div>
              <MoreOptionsIcon />
            </div>
          </HeaderIcons>
        </ChatHeader>

        <ChatBody ref={chatBodyRef}>
          <TimestampDivider>Today</TimestampDivider>
          {renderMessages()}
        </ChatBody>

        <ChatFooter>
          <InputWrapper>
            <InputEmojiButton>
              <EmojiIcon />
            </InputEmojiButton>
            <InputText />
            <InputRightIcons>
              <AttachIcon />
              <CameraIcon />
            </InputRightIcons>
          </InputWrapper>
          <MicButtonCircle>
            <MicIcon />
          </MicButtonCircle>
        </ChatFooter>

        <WebViewContainer isVisible={!!webViewUrl}>
          <WebViewHeader>
            <BackButton onClick={handleCloseWebView}>
              <BackArrowIcon />
            </BackButton>
            <WebViewTitle>{webViewTitle}</WebViewTitle>
          </WebViewHeader>
          {webViewUrl && (
            <WebViewIframe
              src={webViewUrl}
              title="Web View"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          )}
        </WebViewContainer>
      </PhoneScreen>
    </PhoneFrame>
  );
};

export default PhonePreview;
