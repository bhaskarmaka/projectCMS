import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { mockMessages, type Message } from "@/lib/mock-data";

interface ChatBoxProps {
  complaintId: string;
  senderRole: "user" | "agent";
  senderName: string;
}

const ChatBox = ({ complaintId, senderRole, senderName }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>(
    mockMessages.filter((m) => m.complaintId === complaintId)
  );
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = () => {
    if (!text.trim()) return;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      complaintId,
      text,
      senderRole,
      senderName,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMsg]);
    setText("");
  };

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs text-primary/80 hover:text-primary font-medium transition-colors"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        {isOpen ? "Hide chat" : `Chat (${messages.length})`}
      </button>

      {isOpen && (
        <div className="mt-2 rounded-xl border border-border/30 bg-background/30 backdrop-blur-sm overflow-hidden">
          {/* Messages */}
          <div className="h-48 overflow-y-auto p-3 space-y-2.5">
            {messages.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-8">No messages yet</p>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col",
                  m.senderRole === senderRole ? "items-end" : "items-start"
                )}
              >
                <span className="text-[10px] text-muted-foreground mb-1 px-1">
                  {m.senderName}
                </span>
                <div
                  className={cn(
                    "px-3 py-2 rounded-xl text-sm max-w-[80%] leading-relaxed",
                    m.senderRole === senderRole
                      ? "bg-primary/12 text-foreground rounded-br-md"
                      : "bg-secondary/60 text-secondary-foreground rounded-bl-md"
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 p-2.5 border-t border-border/30">
            <Input
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="h-8 text-sm bg-secondary/30 border-border/30 rounded-lg"
            />
            <Button
              size="sm"
              onClick={sendMessage}
              className="h-8 w-8 p-0 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 shadow-[0_0_10px_hsl(160_84%_39%/0.15)]"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
