import { useSamples } from "../../contexts/SamplesContext";

export const ToolSelector = () => {
  const { tools, selectedTool, setSelectedTool } = useSamples();

  return (
    <div className="mb-4 w-full max-w-xs mx-auto">
      <label
        htmlFor="tool-select"
        className="block mb-1 text-white text-sm font-semibold"
      >
        Select Tool:
      </label>
      <select
        id="tool-select"
        className="w-full p-2 rounded bg-gray-700 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
        value={selectedTool?.id ?? ""}
        onChange={(e) => {
          const tool = tools.find((t) => t.id === Number(e.target.value));
          if (tool) setSelectedTool(tool);
        }}
      >
        <option value="" disabled>
          -- Select a tool --
        </option>
        {tools.map((tool) => (
          <option key={tool.id} value={tool.id}>
            {tool.name}
          </option>
        ))}
      </select>
    </div>
  );
};
