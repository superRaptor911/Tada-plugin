import { useState } from "react";
import { Plus, Settings, Info, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2 z-50">
      <div
        className={`flex flex-col items-center gap-2 transition-all ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
        } duration-300`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="bg-white shadow-md hover:bg-gray-100"
        >
          <Settings className="w-5 h-5 text-black" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white shadow-md hover:bg-gray-100"
        >
          <Info className="w-5 h-5 text-black" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-white shadow-md hover:bg-gray-100"
        >
          <LinkIcon className="w-5 h-5 text-black" />
        </Button>
      </div>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={`bg-blue-600 text-white shadow-lg transition-transform duration-300 ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}

const App = () => {
  return (
    <>
      <FloatingActionButton />
    </>
  );
};

export default App;
