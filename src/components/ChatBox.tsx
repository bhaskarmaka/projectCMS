import { useState } from "react";
import { Send } from "lucide-react";
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
        className="text-xs text-primary hover:underline font-medium"
      >
        {isOpen ? "Hide chat" : `Chat (${messages.length})`}
      </button>

      {isOpen && (
        <div className="mt-2 rounded-lg border border-border/50 bg-background/50 overflow-hidden">
          {/* Messages */}
          <div className="h-48 overflow-y-auto p-3 space-y-2">
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
                <span className="text-[10px] text-muted-foreground mb-0.5">
                  {m.senderName}
                </span>
                <div
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm max-w-[80%]",
                    m.senderRole === senderRole
                      ? "bg-primary/15 text-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 p-2 border-t border-border/50">
            <Input
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="h-8 text-sm bg-secondary/50 border-border/50"
            />
            <Button size="sm" onClick={sendMessage} className="h-8 w-8 p-0 bg-primary text-primary-foreground">
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
