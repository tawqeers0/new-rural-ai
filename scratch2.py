with open("frontend/src/components/sections/AITechnologySection.jsx", "r") as f:
    content = f.read()

content = content.replace("boxShadow = '0 20px 40px rgba(15,23,42,0.2)';", "boxShadow = '0 20px 40px rgba(15,23,42,0.15)';")

with open("frontend/src/components/sections/AITechnologySection.jsx", "w") as f:
    f.write(content)
