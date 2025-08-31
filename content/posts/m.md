---
title: m
date: '2024-01-15'
author: aaa
ai_readable: true
---
```mermaid
graph TB
    Q["Question"]
    I1["Idea 1"]
    I2["Idea 2"]
    I3["Idea 3"]
    E1["Expand Idea 1"]
    E2["Expand Idea 2"]
    E3["Expand Idea 3"]
    Best["Evaluate & Select Best"]
    FA["Final Answer"]

    Q --> I1 --> E1 --> Best
    Q --> I2 --> E2 --> Best
    Q --> I3 --> E3 --> Best
    Best --> FA

    style Q fill:#e1f5fe
    style I1 fill:#f3e5f5
    style I2 fill:#f3e5f5
    style I3 fill:#f3e5f5
    style E1 fill:#ede7f6
    style E2 fill:#ede7f6
    style E3 fill:#ede7f6
    style Best fill:#fff9c4
    style FA fill:#c8e6c9
'''
