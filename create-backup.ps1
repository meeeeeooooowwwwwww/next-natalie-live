$sourceDir = "."
$zipFile = "helios-next-backup.zip"

# Exclude directories from the backup
$exclude = @("node_modules", ".next", "helios-next-backup.zip", "create-backup.ps1")

# Create a temporary directory for storing files to zip
$tempDir = ".\temp_backup"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# Copy files to the temporary directory, excluding specified paths
Get-ChildItem -Path $sourceDir -Recurse | 
    Where-Object { 
        $item = $_
        -not ($exclude | Where-Object { $item.FullName -like "*\$_*" })
    } | 
    ForEach-Object {
        $targetPath = $_.FullName -replace [regex]::Escape($sourceDir), $tempDir
        if ($_.PSIsContainer) {
            New-Item -ItemType Directory -Path $targetPath -Force | Out-Null
        } else {
            $targetDir = Split-Path -Path $targetPath -Parent
            if (-not (Test-Path $targetDir)) {
                New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
            }
            Copy-Item -Path $_.FullName -Destination $targetPath -Force
        }
    }

# Create the zip file
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $zipFile)

# Clean up the temporary directory
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "Backup completed: $zipFile created!" 