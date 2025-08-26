import matplotlib.pyplot as plt
import numpy as np

# Data
categories = ['CRT', 'Radix2', 'Radix3']
C_median = [425, 2639, 1924]
C_average = [429, 2669, 1943]
ASM_median = [34, 160, 261]
ASM_average = [37, 160, 261]
# Radix3_median = [60096, 501635, 372211]
# Radix3_average = [91498, 506361, 384523]

# Create x positions and width for the bars
x = np.arange(len(categories))
width = 0.25

# Plot
fig, ax = plt.subplots(figsize=(14, 10))
# Bars for medians
ax.bar(x - width, C_median, width, label='C Median', color='deepskyblue', alpha=0.7)
ax.bar(x, ASM_median, width, label='ASM Median', color='lightgreen', alpha=0.7)
# ax.bar(x + width, Radix3_median, width, label='Radix3 Median', color='salmon', alpha=0.7)

# Line plots for averages
# royalblue
# seagreen
# firebrick
ax.plot(x - width, C_average, marker='o', linestyle='--', color='blue', label='C Average', linewidth=1)
ax.plot(x, ASM_average, marker='o', linestyle='--', color='green', label='ASM Average', linewidth=1)
# ax.plot(x + width, Radix3_average, marker='o', linestyle='--', color='red', label='Radix3 Average', linewidth=1)

# Customization
ax.set_title('Performance Comparison (Cycles/Ticks)', fontsize=18)
ax.set_xlabel('Operations', fontsize=14)
ax.set_ylabel('Cycles/Ticks', fontsize=14)
ax.set_yscale('log')  # Logarithmic scale
ax.set_xticks(x)
ax.set_xticklabels(categories, fontsize=12)
ax.legend(fontsize=12)
# ax.grid(True, which="both", linestyle='--', linewidth=0.5, alpha=0.7)

# Annotate for clarity
label_fontsize = 15  # Increase font size for data labels
for i, category in enumerate(categories):
    ax.text(i - width, C_median[i], f"{C_median[i]:,}", fontsize=15, ha='center', va='bottom', color='deepskyblue')
    ax.text(i, ASM_median[i], f"{ASM_median[i]:,}", fontsize=15, ha='center', va='bottom', color='lightgreen')
    # ax.text(i + width, Radix3_median[i], f"{Radix3_median[i]:,}", fontsize=15, ha='center', va='bottom', color='salmon')

    ax.text(i - width, C_average[i], f"{C_average[i]:,}", fontsize=label_fontsize, ha='center', va='top', color='blue')
    ax.text(i, ASM_average[i], f"{ASM_average[i]:,}", fontsize=label_fontsize, ha='center', va='top', color='green')
    # ax.text(i + width, Radix3_average[i], f"{Radix3_average[i]:,}", fontsize=label_fontsize, ha='center', va='top', color='red')


plt.tight_layout()
plt.show()

