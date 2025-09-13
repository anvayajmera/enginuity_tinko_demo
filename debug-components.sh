#!/bin/bash

echo "🔍 Debugging YSWS Dashboard Components"
echo "====================================="

cd "$(dirname "$0")/ysws-sensor-dashboard/src/components"

echo "📁 Checking component files in: $(pwd)"
echo ""

# Check each component file
components=(
    "App.tsx"
    "Dashboard.tsx" 
    "AdvancedDashboard.tsx"
    "DifficultySwitcher.tsx"
    "LoginPage.tsx"
    "Gauge.tsx"
    "DeviceControlPanel.tsx"
    "ComponentLibrary.tsx"
    "ElectronicsLibrary.tsx"
    "SensorChart.tsx"
)

missing_files=()
existing_files=()

for component in "${components[@]}"; do
    if [ -f "$component" ]; then
        echo "✅ $component - EXISTS"
        existing_files+=("$component")
    else
        echo "❌ $component - MISSING"
        missing_files+=("$component")
    fi
done

echo ""
echo "📊 Summary:"
echo "   ✅ Found: ${#existing_files[@]} files"
echo "   ❌ Missing: ${#missing_files[@]} files"

if [ ${#missing_files[@]} -gt 0 ]; then
    echo ""
    echo "🚨 Missing files detected!"
    echo "   Please create these files:"
    for file in "${missing_files[@]}"; do
        echo "   - $file"
    done
    echo ""
    echo "   The ElectronicsLibrary.tsx is especially important for the Electronics Library feature."
fi

# Check if ElectronicsLibrary.tsx has content
if [ -f "ElectronicsLibrary.tsx" ]; then
    lines=$(wc -l < ElectronicsLibrary.tsx)
    if [ $lines -gt 50 ]; then
        echo ""
        echo "✅ ElectronicsLibrary.tsx has $lines lines - looks good!"
    else
        echo ""
        echo "⚠️  ElectronicsLibrary.tsx only has $lines lines - might be empty or incomplete"
    fi
fi

# Check App.tsx structure
if [ -f "../App.tsx" ]; then
    cd ..
    if grep -q "ElectronicsLibrary" App.tsx; then
        echo "✅ App.tsx imports ElectronicsLibrary"
    else
        echo "❌ App.tsx does NOT import ElectronicsLibrary"
    fi
    
    if grep -q "AdvancedDashboard" App.tsx; then
        echo "✅ App.tsx imports AdvancedDashboard"  
    else
        echo "❌ App.tsx does NOT import AdvancedDashboard"
    fi
fi

echo ""
echo "🎯 To access Electronics Library:"
echo "   1. Start the dashboard: npm run dev"
echo "   2. Go to http://localhost:5174"
echo "   3. Click 'Advanced Dashboard'"
echo "   4. Login with password: advanced123"  
echo "   5. Click '🔧 Electronics' tab"
