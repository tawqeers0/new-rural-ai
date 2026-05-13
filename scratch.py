import re

with open("frontend/src/components/sections/AITechnologySection.jsx", "r") as f:
    content = f.read()

# Replace green with blue
content = content.replace("bg-green-50", "bg-blue-50")
content = content.replace("text-green-600", "text-blue-600")
content = content.replace("to-green-400", "to-cyan-400") # translation modal
content = content.replace("border-green-400 shadow-[0_0_50px_rgba(74,222,128,0.4)]", "border-blue-400 shadow-[0_0_50px_rgba(96,165,250,0.4)]")
content = content.replace("text-green-400", "text-blue-400")
content = content.replace("bg-green-500/20", "bg-blue-500/20")
content = content.replace("border-green-500", "border-blue-500")
content = content.replace("shadow-[0_0_20px_rgba(34,197,94,0.5)]", "shadow-[0_0_20px_rgba(59,130,246,0.5)]")
content = content.replace("border-green-100", "border-blue-100")
content = content.replace("bg-green-100", "bg-blue-100")

# Replace emerald with cyan
content = content.replace("text-emerald-700", "text-cyan-700")
content = content.replace("bg-emerald-50", "bg-cyan-50")
content = content.replace("text-emerald-400", "text-cyan-400")
content = content.replace("bg-emerald-500", "bg-blue-500") # for synced status
content = content.replace("text-emerald-500", "text-blue-500") # for synced check
content = content.replace("bg-emerald-200", "bg-cyan-200")
content = content.replace("text-emerald-600", "text-cyan-600")

with open("frontend/src/components/sections/AITechnologySection.jsx", "w") as f:
    f.write(content)
