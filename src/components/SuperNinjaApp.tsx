import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Settings, 
  User, 
  Code, 
  Image, 
  FileText, 
  Plus,
  Menu,
  X,
  ChevronDown,
  Zap,
  Globe,
  Clock,
  Trash2,
  Copy,
  Download
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  model: string;
}

const AI_MODELS = [
  { id: 'gpt-5', name: 'GPT-5', provider: 'OpenAI', type: 'text', description: 'Most capable model for complex tasks' },
  { id: 'claude-4.5', name: 'Claude Sonnet 4.5', provider: 'Anthropic', type: 'text', description: 'Balanced performance and safety' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', type: 'multimodal', description: 'Fast, versatile multimodal model' },
  { id: 'gemini-2.5', name: 'Gemini 2.5 Pro', provider: 'Google', type: 'multimodal', description: 'Google\'s advanced multimodal AI' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', type: 'text', description: 'High-performance reasoning model' },
  { id: 'llama-4', name: 'Llama 4 Maverick', provider: 'Meta', type: 'text', description: 'Open source excellence' },
  { id: 'qwen-32b', name: 'Qwen 3 32B', provider: 'Qwen', type: 'text', description: 'Ultra-fast with Cerebras' },
  { id: 'flux-1', name: 'FLUX.1 Kontext Pro', provider: 'Black Forest Labs', type: 'image', description: 'Professional image generation' },
  { id: 'imagen-4', name: 'Imagen 4 Ultra', provider: 'Google', type: 'image', description: 'Ultra-realistic image generation' },
  { id: 'gpt-image-1', name: 'GPT Image 1', provider: 'OpenAI', type: 'image', description: 'OpenAI\'s image model' }
];

export function SuperNinjaApp() {
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'New conversation',
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: 'Hello! I\'m SuperNinja, your all-purpose AI assistant. I can help you with coding, writing, research, image generation, and much more. What would you like to work on today?',
          timestamp: new Date(),
          model: 'gpt-5'
        }
      ],
      createdAt: new Date(),
      model: 'gpt-5'
    }
  ]);
  
  const [currentSession, setCurrentSession] = useState<string>('1');
  const [inputMessage, setInputMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-5');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [sessions]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setSessions(prev => prev.map(session => 
      session.id === currentSession 
        ? { ...session, messages: [...session.messages, newMessage] }
        : session
    ));

    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you want help with: "${inputMessage}". As SuperNinja with access to multiple AI models and tools, I can assist you with this task. Let me help you step by step.`,
        timestamp: new Date(),
        model: selectedModel
      };

      setSessions(prev => prev.map(session => 
        session.id === currentSession 
          ? { ...session, messages: [...session.messages, aiResponse] }
          : session
      ));
      
      setIsTyping(false);
    }, 1500);
  };

  const handleNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New conversation',
      messages: [],
      createdAt: new Date(),
      model: selectedModel
    };
    
    setSessions(prev => [newSession, ...prev]);
    setCurrentSession(newSession.id);
  };

  const currentSessionData = sessions.find(s => s.id === currentSession);
  const currentModel = AI_MODELS.find(m => m.id === selectedModel);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">SuperNinja</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <Button onClick={handleNewSession} className="w-full" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            New Conversation
          </Button>
        </div>

        {/* Sessions List */}
        <ScrollArea className="flex-1 p-2">
          {sessions.map(session => (
            <div
              key={session.id}
              onClick={() => setCurrentSession(session.id)}
              className={`p-3 rounded-lg cursor-pointer mb-1 transition-colors ${
                currentSession === session.id 
                  ? 'bg-gray-100 border border-gray-200' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {session.title}
                </span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {AI_MODELS.find(m => m.id === session.model)?.name || session.model}
                </Badge>
                <span className="text-xs text-gray-500">
                  {session.messages.length} messages
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                  <Menu className="w-4 h-4" />
                </Button>
              )}
              
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold text-gray-900">
                  {currentSessionData?.title || 'SuperNinja'}
                </h1>
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {currentModel?.type}
                </Badge>
              </div>
            </div>

            {/* Model Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-600 to-blue-600 rounded" />
                  {currentModel?.name || 'Select Model'}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {AI_MODELS.map(model => (
                  <DropdownMenuItem 
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className="flex flex-col items-start p-3"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded" />
                      <span className="font-medium">{model.name}</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {model.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{model.provider}</span>
                    <span className="text-xs text-gray-600 mt-1">{model.description}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Chat Messages */}
        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {currentSessionData?.messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-4 mb-6 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div className={`max-w-3xl ${message.role === 'user' ? 'order-first' : ''}`}>
                  <div className={`rounded-lg p-4 ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white ml-auto' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    {message.role === 'assistant' && message.model && (
                      <Badge variant="outline" className="text-xs">
                        {AI_MODELS.find(m => m.id === message.model)?.name || message.model}
                      </Badge>
                    )}
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-4 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 items-end">
              <Button variant="outline" size="sm" className="px-3">
                <Paperclip className="w-4 h-4" />
              </Button>
              
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask SuperNinja anything..."
                  className="w-full resize-none rounded-lg border border-gray-300 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px] max-h-32"
                  rows={1}
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Code className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Image className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <FileText className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Powered by {currentModel?.provider}</span>
              <span>Press Enter to send, Shift+Enter for new line</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}