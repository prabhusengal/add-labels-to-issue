# add-labels-to-issue v1
The GitHub Action to add labels to issue or PR. This Action (written in JavaScript) wraps the "[Add labels to an issue](https://docs.github.com/en/rest/reference/issues#add-labels-to-an-issue)" REST API<BR/>

## Inputs
### 1. `repository`
#### Required: YES

#### Default: `${{ github.repository }}`

#### Description:
The name of the repository which the issue or PR is in. E.g. '**ActionsRML/add-labels-to-issue**'.


### 2. `issue_number`
#### Required: YES

#### Default: `current`

#### Description:
The number of the issue or PR. <BR/>When no issue/PR number provided, the value is set to '**current**', the number of the issue/PR that triggers current workflow run will be used by default. If do not find a valid number or the provided number is invalid, you may get the "**Not Found**" error.


### 3. `labels`
#### Required: YES

#### Description:
The labels you want to add. You can provide one or more labels.


### 4. `token`
#### Default: `${{ github.token }}`

#### Description:
Personal access token (PAT) used to authenticate.
##


## Example workflows
### Add a single label
```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:      
      - name: Add labels
        uses: ActionsRML/add-labels-to-issue@v1
        with:
          issue_number: 5
          labels: label-01
```

### Add multiple labels
```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    steps:      
      - name: Add labels
        uses: ActionsRML/add-labels-to-issue@v1
        with:
          issue_number: 5
          labels: |
            label-01
            label-02
```
##


## License
The scripts and documentation in this project are released under the [MIT License](https://github.com/ActionsRML/add-labels-to-issue/blob/master/LICENSE) .
##
