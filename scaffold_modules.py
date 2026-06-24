import os

modules = [
    "AttendanceFeature",
    "LeaveManagementFeature",
    "PayrollFeature",
    "DocumentsFeature",
    "ExpensesFeature",
    "OnboardingFeature",
    "PerformanceFeature",
    "ContributionsFeature",
    "TrainingFeature",
    "RecruitmentFeature",
    "RecognitionFeature",
    "AnnouncementsFeature",
    "TeamManagementFeature",
    "AnalyticsFeature",
    "CopilotFeature"
]

base_dir = r"d:\jecrc assesment\HRMS_Modular_Monolithic_BolierPlate Without Git\Modules"
layers = ["Domain", "Application", "Infrastructure", "GraphQL"]

for module in modules:
    module_path = os.path.join(base_dir, module)
    os.makedirs(module_path, exist_ok=True)
    
    for layer in layers:
        layer_name = f"{module}.{layer}"
        layer_path = os.path.join(module_path, layer_name)
        os.makedirs(layer_path, exist_ok=True)
        
        # Create a dummy csproj file
        csproj_path = os.path.join(layer_path, f"{layer_name}.csproj")
        if not os.path.exists(csproj_path):
            with open(csproj_path, 'w') as f:
                f.write(f"""<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

</Project>""")
        
print("Successfully scaffolded modules.")
